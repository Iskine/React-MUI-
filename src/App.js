import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query: `
      query Query {
        attractions {
            id
            name
            detail
            coverimage
            latitude
            longitude
        }
      }`,
      variables: {},
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    fetch("http://localhost:4000", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.attractions);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} item xs={12} md={4}>
              <Card >
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="140"
                  image={item.coverimage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap={true}>
                   {item.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                <a href={"attraction/" + item.id}><Button size="small">Learn More</Button></a>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default App;
