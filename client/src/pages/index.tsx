import { Text, View, StyleSheet } from "react-native";
//graphql imports
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "../gql";

const usersQuery = graphql(/* GraphQL */ `
  query client {
    users {
      name
      kind
    }
  }
`);
function Index() {
  const { data, isLoading, isError } = useQuery(["users"], async () => {
    return request("http://127.0.0.1:8080/graphql", usersQuery);
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;
  return (
    <View style={styles.container}>
      <Text>The users from a rust graphql server {":)"}</Text>
      {data?.users.map((user) => (
        <View key={user.name} style={styles.userList}>
          <Text style={styles.heading}>{user.name}</Text>
          <Text>{user.kind}</Text>
        </View>
      ))}
    </View>
  );
}
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userList: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
