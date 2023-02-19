// basic graphql server with warp and juniper in rust
use juniper::{
    graphql_object, graphql_value, EmptyMutation, EmptySubscription, FieldError, GraphQLEnum,
    RootNode,
};
use warp::Filter;

#[derive(Clone, Copy, Debug)]
struct Context;
impl juniper::Context for Context {}

#[derive(Clone, Copy, Debug, GraphQLEnum)]
enum UserKind {
    Admin,
    User,
    Guest,
}

#[derive(Clone, Debug)]
struct User {
    id: i32,
    kind: UserKind,
    name: String,
}

#[graphql_object(context = Context)]
impl User {
    fn id(&self) -> i32 {
        self.id
    }

    fn kind(&self) -> UserKind {
        self.kind
    }

    fn name(&self) -> &str {
        &self.name
    }

    async fn friends(&self) -> Vec<User> {
        vec![]
    }
}
fn get_users() -> Vec<User> {
    let users = vec![
        User {
            id: 1,
            kind: UserKind::Admin,
            name: "user1".into(),
        },
        User {
            id: 2,
            kind: UserKind::User,
            name: "user2".into(),
        },
        User {
            id: 3,
            kind: UserKind::Guest,
            name: "user3".into(),
        },
    ];
    users
}
#[derive(Clone, Copy, Debug)]
struct Query;

#[graphql_object(context = Context)]
impl Query {
    /// Fetch all users.
    async fn users() -> Vec<User> {
        get_users()
    }
    /// Fetch a user by id.
    async fn getUser(id: i32) -> Result<User, FieldError> {
        let users = get_users();
        let user = users.into_iter().find(|user| user.id == id);
        match user {
            Some(user) => Ok(user),
            None => Err(FieldError::new(
                "User not found",
                graphql_value!({ "not_found": "User not found" }),
            )),
        }
    }
}

type Schema = RootNode<'static, Query, EmptyMutation<Context>, EmptySubscription<Context>>;

fn schema() -> Schema {
    Schema::new(
        Query,
        EmptyMutation::<Context>::new(),
        EmptySubscription::<Context>::new(),
    )
}

#[tokio::main]
async fn main() {
    let state = warp::any().map(|| Context);
    let graphql_filter = juniper_warp::make_graphql_filter(schema(), state.boxed());

    warp::serve(
        warp::get()
            .and(warp::path("graphiql"))
            .and(juniper_warp::graphiql_filter("/graphql", None))
            .or(warp::path("graphql").and(graphql_filter)),
    )
    .run(([127, 0, 0, 1], 8080))
    .await
}
