import React, { Component } from "react";
import { Image } from 'react-native';
import {   
    Container,
    Content,
    Text,
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
    Title,
    Card,
    CardItem
} from 'native-base';
import { connect } from "react-redux";
import { Grid, Col } from "react-native-easy-grid";
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { 
    VIDEOS, 
    youtubeKey,
    youtubeUrl  
} from "../../constants";
import styles from "./styles";
import { 
    youtubeHasError,
    youtubeIsLoading,
    requestYoutube
} from "../../actions";
const headerLogo = require("../../../assets/header-logo.png");
type Props = {
    navigation: () => void
};
class YoutubeVideos extends Component {
    props: Props;

    constructor(props: Props) {
      super(props);
      console.log('YoutubeType', this.props.youtubeType);
    }
       
 
    componentDidMount() {
        if (this.props.youtubeType == VIDEOS) {
            url = `${youtubeUrl}?q=${this.props.book.title.trim()}+'|'+${this.props.book.author.trim()}&part=snippet,id&maxResults=10&type=video&key=${youtubeKey}`
            this.props.requestYoutube(url);
        }
    }
    
    playYoutubeVideo(videoId: string) {
        return YouTubeStandaloneAndroid.playVideo({
            apiKey: youtubeKey,
            videoId: videoId,
            autoplay: true,
            lightboxMode: false
          })
            .then(() => console.log('VideoID:' + item.id.videoId))
            .catch(errorMessage => console.log('Error:' + errorMessage));
               
    }
    render() {
        console.log(this.props.results);	
        if (this.props.isLoading) {
            return <Spinner color='blue' />;
        } 
        if (this.props.hasError) {
            return (
                <Container>
                    <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon active name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Image source={headerLogo} style={styles.imageHeader} />
                    </Body>
                    <Right />
                    </Header>
                    <Content showsVerticalScrollIndicator={false}
                            style={{ backgroundColor: "#fff" }}>       
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Erreur de la source
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card> 
                    </Content>
                </Container>
            );
        }
        return (
            <Container>
                <Header>
                   <Left>
                     <Button transparent onPress={() => this.props.navigation.goBack()}>
                       <Icon active name="arrow-back" />
                     </Button>
                   </Left>
                   <Body>
                     <Image source={headerLogo} style={styles.imageHeader} />
                   </Body>
                   <Right />
                </Header>
                <Content showsVerticalScrollIndicator={false}
                         style={{ backgroundColor: "#fff" }}>
                    {this.props.found  ?
                       <List
                            dataArray={this.props.results.items}
                            renderRow={(item) =>
                                <ListItem 
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "#FFF"
                                    }}
                                    button 
                                    onPress={() => this.playYoutubeVideo(item.id.videoId)}
                                >
                                    <Image source={{ uri: item.snippet.thumbnails.default.url }} style={styles.newsImage} />
                                    <View style={styles.newsContent}>
                                         <Text numberOfLines={2} style={styles.newsHeader}>
                                                {item.snippet.title}
                                         </Text>
                                    </View>
                                </ListItem>
                            }/> :  <Card>
                                        <CardItem>
                                            <Body>
                                                <Text style={{ color: "#000" }}>
                                                    Aucun résultat trouvé
                                                </Text>
                                            </Body>
                                        </CardItem>
                                   </Card> 
                        }
                </Content>
    
             </Container>

        );
    }
}

const mapStateToProps = state => ({
    book: state.book.book,
    youtubeType: state.book.youtubeType,
    results: state.youtube.results,
    isLoading: state.youtube.isLoading,
    hasError: state.youtube.hasError,
    found: state.youtube.found
});

function mapDispatchToProps(dispatch) {
    return {
        requestYoutube: url => dispatch(requestYoutube(url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeVideos);
