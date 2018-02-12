import React from 'react';
import { WebView } from 'react-native';
import { connect } from "react-redux";
type Props = {
    navigation: () => void
};

class MyWeb extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

 
    render() {
        return (
        <WebView
            source={{uri: this.props.url}}
            style={{marginTop: 20}}
        />
        );
    }
}

const mapStateToProps = state => ({
    url: state.google.url
});


export default connect(mapStateToProps, null)(MyWeb);
