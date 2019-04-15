import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { gstyles, colors } from '../shared/Constans';

@inject('api')
@observer
export default class CategoryList extends Component {
    @observable selected = 0
    @observable categories = [{name: 'All Products', category_id: 0}]

    select(item) {
        this.selected = item.category_id
        if (this.props.onCategoryChange)
            this.props.onCategoryChange(this.selected)
    }

    getSelectedColor(item, selected) {
        if (item.category_id !== selected)
            return colors.darkText

        const cat = this.props.mainCategory
        if (cat === 'men')
            return colors.menColor
        if (cat === 'women')
            return colors.womenColor
        return colors.yellow
    }

    async componentDidMount() {
        await this.loadCategories()
    }

    async loadCategories() {
        let res = await this.props.api.get('categories', {
            page: 1,
            limit: Number.MAX_SAFE_INTEGER
        })
        res.rows.forEach(element => {
            this.categories.push(element)
        });
    }

    render() {
        const categories = this.categories.slice()
        const selected = this.selected
        return (
            <FlatList style={styles.categoriesFlatList}
                horizontal={true}
                data={categories}
                renderItem={({ item }) => <View style={styles.itemContainer}>
                    <Text style={{ ...styles.item, color: this.getSelectedColor(item, selected) }}
                        onPress={() => this.select(item)}>{item.name}</Text>
                </View>}
                keyExtractor={(item, index) => item.category_id.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    categoriesFlatList: {
        height: 70,
        backgroundColor: colors.lightGray,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 2,

    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,

    },
    item: {
        ...gstyles.textStyle,
        fontSize: 16,
        color: colors.lightText,
    },
})
