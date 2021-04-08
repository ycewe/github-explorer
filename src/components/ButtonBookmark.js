import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import AsyncStorage from "~/services/asyncStorage";
import ButtonIcon from "~/components/ButtonIcon";
import bookmarkIcon from "~/assets/bookmark.png";
import bookmarkFilledIcon from "~/assets/bookmarkFilled.png";

const ButtonBookmark = ({ id = "", value = "", onChange = () => {} }) => {
  const [isFilled, setIsFilled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkStorage = async () => {
        const data = await AsyncStorage.get(id);

        if (data) {
          setIsFilled(true);
        } else {
          setIsFilled(false);
        }
      };

      checkStorage();
    }, []),
  );

  const fillBookmark = async () => {
    if (isFilled) {
      await AsyncStorage.delete(id);
    } else {
      await AsyncStorage.set(id, { ...value, createdAt: dayjs().unix() });
    }

    onChange(!isFilled);
    setIsFilled(!isFilled);
  };

  return (
    <ButtonIcon
      image={isFilled ? bookmarkFilledIcon : bookmarkIcon}
      label="Bookmark repository"
      onPress={fillBookmark}
    />
  );
};

ButtonBookmark.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onChange: PropTypes.func,
};

export default ButtonBookmark;
