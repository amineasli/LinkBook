import React from 'react';
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
import {
    NEWS, ENCYCLOPEDIAS, REVIEWS, AUDIO, ON_THE_WEB, SOCIAL, BLOG,
    googleUrl,
    cx1, cx2, cx3, cx4, cx5, cx6, cx7
} from "../../constants";
import { 
    gseHasError,
    gseIsLoading,
    requestGoogleCSE,
    openUrl
} from "../../actions";
import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");


type Props = {
    navigation: () => void
};

class GoogleCSE extends React.Component {
 
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        url = "";
        console.log(this.props.book, this.props.searchType);
        switch(this.props.searchType) {
            case NEWS:
                url = `${googleUrl}&${cx5}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}&sort=by date`;
                break;
            case ENCYCLOPEDIAS:
                url = `${googleUrl}&${cx2}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}`;
                break;
            case REVIEWS:
                url = `${googleUrl}&${cx4}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}`;
                break;
            case AUDIO:
                url = `${googleUrl}&${cx3}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}`;
                break;
            case ON_THE_WEB:
                url = `${googleUrl}&${cx1}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}`;
                break;
            case SOCIAL:
                url = `${googleUrl}&${cx7}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}`;
                break;
            case BLOG:
                url = `${googleUrl}&${cx6}&q="${this.props.book.title.trim()}"+${this.props.book.author.trim()}`;
                break;
            default:
                url = "";
        }
        this.props.requestGoogleCSE(url);
        console.log(this.props.results.items);
    }

    openWebView(url) {
        this.props.openUrl(url);
        this.props.navigation.navigate("MyWeb");
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
                                    onPress={() => this.openWebView(item.link)}
                                >
                                    <Grid>
                                        <Col size={70}>
                                            <Text numberOfLines={2} style={styles.newsHeader}>
                                                {item.title.trim()}
                                            </Text>
                                        </Col>
                                        <Col size={30} style={{ marginBottom: 5 }} >
                                            <Text style={styles.newsLink}>
                                                {item.displayLink}
                                            </Text>
                                        </Col>
                                    </Grid>
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
    searchType: state.book.searchType,
    results: state.google.results,
    isLoading: state.google.isLoading,
    hasError: state.google.hasError,
    found: state.google.found
});

function mapDispatchToProps(dispatch) {
    return {
        requestGoogleCSE: url => dispatch(requestGoogleCSE(url)),
        openUrl: url => dispatch(openUrl(url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCSE);