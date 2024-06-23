import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

function Detail() {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;

  useEffect(() => {
    fetch(`${baseUrl}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orchid");
        }
        return response.json();
      })
      .then((data) => setOrchid(data))
      .catch((error) => console.error("Error fetching orchid:", error.message));
  }, [baseUrl, id]);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "20px",
  });

  return (
    orchid && (
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 1200,
          flexGrow: 1,
          backgroundColor: "#e8f5e9",
          boxShadow: "10px",
          marginTop: "60px",
          marginBottom: "50px",
          borderRadius: "20px",
        }}
        key={orchid.id}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 500, height: 500 }}>
              <Img alt="orchid" src={orchid.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid style={{ paddingTop: "120px" }} item xs>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "red",
                    fontSize: "30px",
                  }}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  {orchid.name}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Rating: {orchid.rating}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Is Special: {orchid.isSpecial ? "Yes" : "No"}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Color: {orchid.color}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Origin: {orchid.origin}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Category: {orchid.category}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Habitat: {orchid.habitat}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Description: {orchid.description}
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    marginLeft: "40px",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Video URL: <a href={orchid.videoUrl}>{orchid.videoUrl}</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  );
}

export default Detail;
