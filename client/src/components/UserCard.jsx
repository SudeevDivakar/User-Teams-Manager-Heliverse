import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function UserCard({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let textColor = "#000"; // Default text color
  let genderSign; // Variable to hold gender sign image

  // Determine text color and gender sign based on gender value
  switch (user.gender && user.gender.toLowerCase()) {
    case "male":
      textColor = "blue";
      genderSign = "/male.png";
      break;
    case "female":
      textColor = "#fc05cf";
      genderSign = "/female.png";
      break;
    case "bigender":
      textColor =
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
      genderSign = "/bigender.png";
      break;
    case "genderfluid":
      textColor =
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
      genderSign = "/genderfluid.png";
      break;
    case "genderqueer":
      textColor =
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
      genderSign = "/genderqueer.png";
      break;
    case "agender":
      textColor =
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
      genderSign = "/agender.png";
      break;
    case "non binary":
      textColor =
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
      genderSign = "/nonbinary.png";
      break;
    case "polygender":
      textColor =
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
      genderSign = "/polygender.png";
      break;
    default:
      break;
  }

  const rainbowStyle = {
    background: `-webkit-linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 270,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        border: "2px solid #2196f3",
        borderRadius: 4,
        borderColor: "#100b36",
        mt: "1rem",
        mb: "1rem",
        mr: "1rem",
        ml: "1rem",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
          <img
            src={user.avatar}
            alt="User Display Picture"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />

          <Box>
            <IconButton
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Edit User</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 1 }}
          gutterBottom
        >
          User ID: {user.id}
        </Typography>

        <Typography variant="h5" component="div" gutterBottom>
          {user.first_name} {user.last_name} -{" "}
          {user.gender && user.gender !== "Male" && user.gender !== "Female" ? (
            <span style={rainbowStyle}>{user.gender}</span>
          ) : (
            <span style={{ color: textColor }}>{user.gender}</span>
          )}{" "}
          <img
            src={genderSign}
            alt="Gender"
            style={{ width: 20, height: 20 }}
          />
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 1.5 }}
          gutterBottom
        >
          email: {user.email}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            Domain: {user.domain}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {user.available ? (
              <span style={{ color: "green" }}>Available</span>
            ) : (
              <span style={{ color: "red" }}>Unavailable</span>
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
