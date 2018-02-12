import React, { Component } from "react";
import { Image, TouchableOpacity, ListView } from "react-native";
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
    Toast,
    CardItem,
    Card
} from "native-base";
import { connect } from "react-redux";
import { Grid, Col } from "react-native-easy-grid";

import { 
    fetchFavoritesList,
    deleteItem
} from "../../actions";
import styles from "./styles";
const headerLogo = require("../../../assets/header-logo.png");
type Props = {
    navigation: () => void
};

class Favourites extends Component {
  props: Props;
  state: {
    listViewData: any
  };
  ds: Object;
  constructor(props: Props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
    this.state = {
      listViewData: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount', 'CALLED');
    this.props.fetchFavoritesList(this.props.userInfo.uid);
    this.setState({listViewData: this.props.items});
    //console.log('UID', this.props.userInfo.uid, 'ITEMS', this.props.items);
   // console.log('listViewData', this.state.listViewData);
  }

  /*shouldComponentUpdate(nextProps, nextState) {
      return nextState.listViewData.length > 0
  }*/

  deleteRow(secId: string, rowId: string, rowMap: any, key: string) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
    this.props.deleteItem(this.props.userInfo.uid, key);
  }

  render() {    
        const navigation = this.props.navigation;    
        //console.log(this.state.listViewData);
        console.log('ITEMS LENGTH', this.props.items.length);
        if(this.props.favouritesAreLoading) {
            return <Spinner color='blue' />;
        } else { 
            return (
                    <Container>
                        <Image
                            source={require("../../../assets/bg-transparent.png")}
                            style={styles.container}
                        >
                        <Header>
                            <Left>
                                <Button transparent onPress={() => navigation.goBack()}>
                                <Icon active name="arrow-back" />
                                </Button>
                            </Left>
                            <Body>
                                <Image source={headerLogo} style={styles.imageHeader} />
                            </Body>
                            <Right />
                        </Header>
                        {this.ds.cloneWithRows(this.state.listViewData).getRowCount() === 0 ? (
                            <Content
                                showsVerticalScrollIndicator={false}
                                style={{ backgroundColor: "#fff" }}
                            >
                                <Card>
                                        <CardItem>
                                        <Body>
                                            <Text style={{ color: "#000" }}>
                                                Aucun favori pour le moment
                                            </Text>
                                        </Body>
                                        </CardItem>
                                </Card>
                            </Content>
                        ) : ( 
                        <Content
                            showsVerticalScrollIndicator={false}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <ListItem
                                style={{
                                    backgroundColor: "#fff",
                                    justifyContent: "center"
                                }}
                            >
                                <Text style={styles.textNote}>
                                    Swipe the items to left and right
                                </Text>
                            </ListItem>
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                extraData={this.state}
                                renderRow={data =>
                                <ListItem
                                    swipeList
                                    style={{
                                    flexDirection: "row",
                                    backgroundColor: "#FFF"
                                    }}
                                    onPress={() => navigation.navigate("Story")}
                            >
                                <Image source={{ uri: data.imgUrl }} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                <Text numberOfLines={2} style={styles.newsHeader}>
                                    {data.title}
                                </Text>
                                <Grid style={{ marginTop: 25 }}>
                                    <Col>
                                    <TouchableOpacity>
                                        <Text style={styles.newsLink}>
                                        {data.author}
                                        </Text>
                                    </TouchableOpacity>
                                    </Col>
                                </Grid>
                                </View>
                            </ListItem>}
                            renderLeftHiddenRow={data =>
                            <Button
                                full
                                style={([styles.swipeBtn], { backgroundColor: "#CCC" })}
                            >
                                <Icon
                                active
                                name="information-circle"
                                style={{ fontSize: 35 }}
                                />
                            </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button
                                full
                                danger
                                onPress={_ => this.deleteRow(secId, rowId, rowMap, data.key)}
                                style={styles.swipeBtn}
                            >
                                <Icon active name="trash" style={{ fontSize: 35 }} />
                            </Button>}
                            leftOpenValue={100}
                            rightOpenValue={-100}
                        />
                        
                        </Content>
                        )}
                        </Image>
                    </Container>
                );
        }
    }
}

const mapStateToProps = state => ({
    userInfo: state.login.userInfo,
    favouritesAreLoading: state.favourites.favouritesAreLoading,
    items: state.favourites.items
});

function mapDispatchToProps(dispatch) {
    return {
      fetchFavoritesList: (uid, barcode) => dispatch(fetchFavoritesList(uid, barcode)),
      deleteItem: (uid, key) => dispatch(deleteItem(uid, key))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);