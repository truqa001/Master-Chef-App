import React from "react";
import { Box, Card, Text } from "gestalt";
import "./Recipe.css";

const Recipe = props => (
  <div className="mb-4">
    <Card image={<img src={props.src} alt="recipe"/>}>
      <Text align="center" bold size="xl">
        <Box paddingX={3} paddingY={2}>
          {props.title}
        </Box>
      </Text>
    </Card>
  </div>
);

export default Recipe;
