import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

function Attraction() {
  let params = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [attraction, setAttraction] = useState({});

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query: `
			query Query($attractionId: Int!) {
				attraction(id: $attractionId) {
				  name
				  coverimage
				  detail
				  id
				  latitude
				  longitude
				}		  
		  }`,
      variables: { attractionId: parseInt(params.id) },
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
          setAttraction(result.data.attraction);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [params.id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container maxWidth="lg" key={attraction.id}>
        <CardActions>
          <a href={"/"}>
            <Button size="small">Back</Button>
          </a>
        </CardActions>
        <Card>
          <CardMedia
            component="img"
            alt={attraction.name}
            height="auto"
            image={attraction.coverimage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {attraction.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {attraction.detail}
            </Typography>
			<Typography>
				{attraction.latitude}
				, {attraction.longitude}
			</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default Attraction;
