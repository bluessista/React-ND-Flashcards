import React from "react";
import { Text } from "react-native";

export const formatNumberOfQuestions = questions => {
    if (questions.length > 1 || questions.length === 0) {
      return <Text>{questions.length} cards</Text>;
    } else {
      return <Text>1 card</Text>;
    }
};