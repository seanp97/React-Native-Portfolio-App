import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

class About extends Component {

    constructor() {
        super();

        this.state = {
            portfolioData: [],
            loading: true
        }
    }

    async componentDidMount() {
        this.fetchPortfolioData();
    }

    fetchPortfolioData = async () => {
        const portData = await fetch('https://sean-site-api.herokuapp.com/portfolio');
        const portResults = await portData.json();
        this.setState({portfolioData: portResults, loading: false});
    }

    render() {
        return (
            
            <View style={styles.container}>

                {!this.state.portfolioData || this.state.loading ? (<Text>Loading..</Text>) : (             
                    <View>
                        <FlatList style={styles.listComp}
                            data={this.state.portfolioData}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <TouchableOpacity key={item._id}>
                                    <View>
                                        <Text style={styles.listText}>{item.project_title}</Text>
                                        <Image
                                            style={styles.stretch}
                                            source={{ uri: item.project_image }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
                
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        paddingLeft: 20,
        paddingBottom: 50
    },
    listComp: {
        paddingTop: 50
    },
    listText: {
        marginBottom: 20
    },
    stretch: {
        height: 200, 
        left: 10, 
        right: 10,
        marginBottom: 50
    },
});

export default About;
