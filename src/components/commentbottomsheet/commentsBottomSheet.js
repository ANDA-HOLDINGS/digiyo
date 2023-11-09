import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-native-btr";
import { Colors, Fonts, Default } from "../../constants/styles2";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../theme/ThemeContext";
import axios from "axios";
import { GET_POSTS_COMMENTS } from "../../config/urls";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CommentsReply from "../commentsreply/CommentsReply";
import TextComp from "../TextComp";

const { height } = Dimensions.get("window");

const CommentsBottomSheet = (props) => {
  const { userInfo, userTokens } = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`commentsBottomSheet:${key}`);
  }
  const isFocused = useIsFocused()
  const [comment, setComment] = useState();
  const [theRep, setTheRep] = useState();
  const [isLoading, setLoading] = useState(false);

  const [replyToCommentId, setReplyToCommentId] = useState();
  const [reply, setReply] = useState(false);

  const [viewReply, setViewReply] = useState(false);

  const [likes, setLikes] = useState({})

  const userId = userInfo.authenticated_user.user_id

  // Function to Generate a Unique ID for array elements
  const GenerateUniqueID = () => {
    return Math.floor(Math.random() * Date.now()).toString();
  };

  const userToken = userTokens
  const auth = userToken

  const [commentsData, setCommentsData] = useState([]);
  const [commentUser, setCommentUser] = useState();
  
  const onFetchLikes = async (comments) => {
    try {
      console.log('onFetchLikes runing...')
      const tempLikes = {}
      for (let index = 0; index < comments.length; index++) {
        const comment = comments[index];
        const config = {
          method: "GET",
          url: GET_POSTS_COMMENTS + "comment" + "/likes/" + comment.comment.comment_id,
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
        };
        const response = await axios(config)
        const commentLikes = response.data;
        tempLikes[comment.comment.comment_id] = commentLikes
      }
      setLikes({...tempLikes})
      console.log('onFetchLikes done...')
    } catch (error) {
      console.log(error)  
    }
  };
  
  const onLikeComment = async (comment_id) => { 
    console.log("like comment", comment_id)
    const config = {
      method: "post",
      data: {
        "content": comment,
      },
      url: GET_POSTS_COMMENTS + "comment/" + comment_id + "/togglelike",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    try {
      const response = await axios(config)
      console.log("like made", response.data, response.status);
      await onFetchLikes(commentsData)
    } catch (error) {
      console.log("error liking comment", error);
    }
    setLoading(false);
  };

  const onComment = async (post_id) => { 
    const config = {
      method: "post",
      data: {
        "content": comment,
      },
      url: GET_POSTS_COMMENTS + post_id + "/comment",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    setComment(null);
    try {
      await axios(config)
      setComment(null);
      let temp = {
        comment: {
          comment_id: GenerateUniqueID(),
          content: comment,
          user_id: GenerateUniqueID(),
          post_id: GenerateUniqueID(),
          created_at: "2023-10-13T17:28:58.715Z",
          updated_at: "2023-10-13T17:28:58.715Z",
          author:{
            username: commentUser
          }
        }
      };
      setCommentsData([...commentsData, temp]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReplyComment = async (post_id, comment_id) => {
    setReply(false);

    const config = {
      method: "post",
      data: {
        "content": theRep,
      },
      url: GET_POSTS_COMMENTS + post_id + "/reply/" + comment_id,
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    };    
    setLoading(true);
    try {
      await axios(config)
    } catch (error) {
      console.log('error replying comment=>',  error)
    }
    setLoading(false);
    setTheRep("");
 
  };

  const onFetchComments = async (post_id) => {
    console.log('fetching comments...')
    const config = {
      method: "get",
      url: GET_POSTS_COMMENTS + post_id + "/comment", 
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    }; 
    try {
      const response = await axios(config)
      if (response?.data) {
        await onFetchLikes(response.data)
        setCommentsData(response.data);
      }
    } catch (error) {
      console.log('error fetching comments=> ', error)
    }
  };

  useEffect(() => {
    onFetchComments(props.post_id)
  }, []);

  const setFalse = () => {
    setViewReply(false)
  }
  
  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={() => {
        props.closeCommentBottomSheet();
        setComment(null);
        setReply(false);
        setReplyToCommentId(null);
        setViewReply(false)
      }}
      onBackdropPress={() => {
        props.closeCommentBottomSheet();
        setComment(null);
        setReply(false);
        setReplyToCommentId(null);
        setViewReply(false)
      }}
    >
      <View
        style={{
          height: height / 1.5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: theme.theme == "dark" ? Colors.black : Colors.white,
          ...Default.shadow,
        }}
      >
        <Text
          style={{
            ...Fonts.Bold18white,
            color: theme.color,
            textAlign: "center",
            marginTop: Default.fixPadding * 1.3,
            marginBottom: Default.fixPadding,
          }}
        >
          {tr("comments")}
        </Text>
        <FlatList
          data={commentsData}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: index === 0 ? Default.fixPadding : 0,
                  marginBottom: Default.fixPadding * 2,
                  marginHorizontal: Default.fixPadding * 2,
                }}
              >
                <View
                  style={{
                    flex: 9,
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: 48, height: 48, borderRadius: 24 }}
                  />
                  <View
                    style={{
                      alignItems: isRtl ? "flex-end" : "flex-start",
                      marginHorizontal: Default.fixPadding * 0.8,
                    }}
                  >
                    <Text style={{ ...Fonts.Medium14primary }}>{item.comment.author.username}</Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.Medium14white,
                        color: theme.color,
                        overflow: "hidden",
                      }}
                    >
                      {item.comment.content}
                    </Text>
                    <View
                      style={{
                        flexDirection: isRtl ? "row-reverse" : "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ ...Fonts.Medium12grey, color: theme.color }}>
                        {item.time}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setReply(true);
                          setReplyToCommentId(item.comment.comment_id);
                        }}
                      >
                        <Text
                          style={{
                            ...Fonts.Medium12grey,
                            marginHorizontal: Default.fixPadding * 2.7,
                          }}
                        >
                          {tr("reply")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setViewReply(!viewReply);
                          setReplyToCommentId(item.comment.comment_id);
                        }}
                      >
                        <Text
                          style={{
                            ...Fonts.Medium12grey,
                            marginHorizontal: Default.fixPadding * 2.7,
                          }}
                        >
                          view replies
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
        
                <TouchableOpacity
                  onPress={() => onLikeComment(item.comment.comment_id)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: isRtl ? "flex-start" : "flex-end",
                  }}
                >
                  <FontAwesome
                    name="heart"
                    size={16}
                    color={likes[item.comment.comment_id]?.filter(like => like.user_id === userId)?.length? Colors.primary : Colors.grey}
                  />
                  
                  <TextComp text= {likes[item.comment.comment_id]?.length||0} size={12}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        {viewReply && replyToCommentId ? (
          <View style={{height: 320}}>
            
            <CommentsReply id={replyToCommentId}
              close={setFalse}
            />
          </View>
    ) : null}

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding,
            marginBottom: Default.fixPadding * 2,
          }}
        >
          <View style={{ flex: 8.5 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[Colors.primary, Colors.extraDarkPrimary]}
              style={{
                marginLeft: isRtl ? Default.fixPadding : Default.fixPadding * 2,
                marginRight: isRtl
                  ? Default.fixPadding * 2
                  : Default.fixPadding,
                borderRadius: 20,
                ...Default.shadow,
              }}
            >
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: Default.fixPadding * 1.2,
                  paddingHorizontal: Default.fixPadding * 0.9,
                  margin: Default.fixPadding * 0.1,
                  borderRadius: 20,
                  backgroundColor: Colors.white,
                }}
              >
                <TextInput
                  value={reply ? theRep : comment}
                  onChangeText={reply ? setTheRep : setComment}
                  placeholder={reply ? "Reply" : "comment"}
                  placeholderTextColor={Colors.grey}
                  selectionColor={Colors.primary}
                  style={{
                    ...Fonts.Medium16black,
                    flex: 7.3,
                    textAlign: isRtl ? "right" : "left",
                    marginHorizontal: Default.fixPadding * 1.2,
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          {isLoading ? (
            <>
              <ActivityIndicator />
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (reply) {
                  onReplyComment(
                    props.post_id,
                    replyToCommentId
                  );
                } else {
                  console.log()
                  const user = commentsData.map((user) => user.comment.author.username)
                  setCommentUser(user)
                  onComment(
                    props.post_id,
                  );
                }
              }}
              style={{
                flex: 1.5,
                marginRight: isRtl ? 0 : Default.fixPadding * 2,
                marginLeft: isRtl ? Default.fixPadding * 2 : 0,
              }}
            >
              <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                colors={[Colors.primary, Colors.extraDarkPrimary]}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: Default.fixPadding * 0.1,
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: Colors.white,
                  }}
                >
                  <Image
                    source={require("../../../assets/icons/send.png")}
                    style={{ width: 20, height: 20, resizeMode: "contain" }}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CommentsBottomSheet;
