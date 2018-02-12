import React, { Component } from "react";
import { Image, TouchableOpacity, ListView, Platform, Alert } from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  View,
  List,
  ListItem,
  Button,
  Icon,
  Spinner,
  Header,
  Left,
  Right,
  Body,
  Toast,
  CardItem,
  Card
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import { 
  fetchBook,
  fetchFavorites, 
  doAddToFavorites,
  doRemoveFromFavorites,
  isLoading, 
  googleCSE, 
  youtubeVideos
} from "../../actions";
import CustomHeader from "../../components/CustomHeader";
import { NEWS, ENCYCLOPEDIAS, REVIEWS, AUDIO, VIDEOS, ON_THE_WEB, SOCIAL, BLOG, myFirebase } from "../../constants";
import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");
type Props = {
  navigation: () => void
};
class Book extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.foundInFavorites);
    this.props.fetchBook(this.props.barcode);
    console.log('user', this.props.userInfo.uid, 'barcode', this.props.barcode );
    this.props.fetchFavorites(this.props.userInfo.uid, this.props.barcode);
    console.log('KEY', this.props.iTemKey);
  }

  getFullImgUrl(imgHash, size='medium'){
		gln = 3025594739201;
		urlImg = 'http://images1.centprod.com/';
		//size = 'cover-medium.jpg';
		
		return fullUrl =  urlImg + gln + '/' + imgHash + '-cover-' + size + '.jpg';
  }

  goToGoogleCSE(searchType) {
      this.props.googleCSE(searchType);
      this.props.navigation.navigate('GoogleCSE');
  }

  goToYoutubeVideos(searchType) {
      this.props.youtubeVideos(searchType);
      this.props.navigation.navigate('YoutubeVideos');
  }
  
  addToFavorites() {
		if (this.props.isAnonymous) {
			Alert.alert(
			  'Ajouter en favori',
			  'Pour ajouter ce livre en favori, vous devez être connecté.',
			  [
				{text: 'Fermer', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Connexion / Inscription', onPress: () => this.props.navigation.navigate('Login')},
			  ],
			  { cancelable: false }
			 )
		 return;
		} else {
      this.props.doAddToFavorites(
        this.props.userInfo.uid, 
        this.props.barcode, 
        this.props.book,
        this.getFullImgUrl(this.props.book.imghash , 'thumb')
      );
    }			
  }
  
  removeFromFavorites() {
    console.log('KEY2', this.props.iTemKey);
    this.props.doRemoveFromFavorites(
      this.props.userInfo.uid, 
      this.props.iTemKey
    ); 
  }

  render() {
    const navigation = this.props.navigation;
    console.log("Book", this.props.found);

    if(this.props.isLoading) {
        return <Spinner color='blue' />;
    } else { 
        return (
            <Container>
              <Header>
              <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                  <Icon active name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Image source={headerLogo} style={styles.imageHeader} />
              </Body>
              <Right>
                {this.props.foundInFavorites ? (
                  <Button
                      transparent
                      onPress={() => this.removeFromFavorites()}
                    >
                    <Icon name="md-heart" style={styles.headerIcons} />
                  </Button>
                ) : ( 
                  <Button
                      transparent 
                      onPress={() => this.addToFavorites()}
                    >
                    <Icon name="md-heart-outline" style={styles.headerIcons} />
                  </Button>
                )}
              </Right>
            </Header>
              {this.props.found && 
                  <View>
                    <View style={styles.bookHeaderContainer}>
                    <View style={{ alignSelf: "center" }}>
                      <Image
                        source={{uri: this.getFullImgUrl(this.props.book.imghash)}}
                        style={{width: 100, height: 150}}
                      />
                    </View>
                      <Text style={styles.bookHeader}>{ this.props.book.title.trim() }</Text>
                      <Text note style={styles.bookHead}>
                        { this.props.book.author.trim() } 
                      </Text>
                      <Text note style={styles.bookHead}>
                        { this.props.book.publisher.trim() } 
                      </Text>
                      <Text note style={styles.bookHead}>
                        { this.props.book.publication.slice(0,4) }
                      </Text>
                    </View>
                    
              </View> 
            }
             {this.props.found ? (
                  <Content
                  showsVerticalScrollIndicator={false}
                  style={{ backgroundColor: "#fff" }}
                  >
                        <View style={styles.bookContent}>
                          <View style={styles.bookTopicsBox}>
                        
                          </View> 
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(NEWS)}
                                      >
                                              <Text>Actualités</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(ENCYCLOPEDIAS)}
                                      >
                                              <Text>Encyclopédies</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(REVIEWS)}
                                      >
                                              <Text>Avis de lecteurs</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(ON_THE_WEB)}
                                      >
                                              <Text>Sur le web</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(AUDIO)}
                                      >
                                              <Text>Audio</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(SOCIAL)}
                                      >
                                              <Text>Social</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToGoogleCSE(BLOG)}
                                      >
                                              <Text>Blog</Text>
                                      </Button>
                                      <Button 
                                        rounded
                                        primary
                                        block
                                        large
                                        style={styles.roundedButton}
                                        onPress={()=> this.goToYoutubeVideos(VIDEOS)}
                                      >
                                              <Text>Vidéos</Text>
                                      </Button>
                  
                        </View>
              </Content>
              ) : ( 
                <Content
                  showsVerticalScrollIndicator={false}
                  style={{ backgroundColor: "#fff" }}
                  >
                  <Card>
                    <CardItem>
                      <Body>
                        <Text style={{ color: "#000" }}>
                          Livre introuvable.
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </Content>
              )
           }
              
            </Container>
          );
        }
    }
   
}

const mapStateToProps = state => ({
    barcode: state.barcode.barcode,
    isLoading: state.book.isLoading,
    book: state.book.book,
    found: state.book.found,
    foundInFavorites: state.book.foundInFavorites,
    iTemKey: state.book.iTemKey,
    userInfo: state.login.userInfo,
    isAnonymous: state.login.isAnonymous
});

function mapDispatchToProps(dispatch) {
    return {
      fetchBook: barcode => dispatch(fetchBook(barcode)),
      fetchFavorites: (uid, barcode) => dispatch(fetchFavorites(uid, barcode)),
      doAddToFavorites: (uid, barcode, book, img) => dispatch(doAddToFavorites(uid, barcode, book, img)),
      doRemoveFromFavorites: (uid, iTemKey) => dispatch(doRemoveFromFavorites(uid, iTemKey)),
      googleCSE: searchType => dispatch(googleCSE(searchType)),
      youtubeVideos: youtubeType => dispatch(youtubeVideos(youtubeType)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);