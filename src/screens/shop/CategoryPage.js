import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, gstyles } from '../../shared/Constants';
import { FlatList } from 'react-native-gesture-handler';
import { observable, intercept } from 'mobx';
import { observer, inject } from 'mobx-react';
import CategoryList from '../../components/CategoryList';

@inject('api')
@observer
export default class CategoryPage extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state
    this.category = params? params.category: 'men'
    props.navigation.setParams({
      rightComponent: <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: -24, }}
        onPress={this.props.menuPress}>
        <MCIcon name="filter" size={40} color={colors.darkText} />
      </TouchableOpacity>
    })
  }

  @observable products = []
  @observable total = Number.MAX_SAFE_INTEGER
  @observable categoryId

  onCategoryChange = async (catId) => {
    this.categoryId = catId
    this.products.length = 0
    await this.loadMoreProducts()
  }

  async componentDidMount() {
    await this.loadMoreProducts()
  }

  async loadMoreProducts() {
    if (this.products.length < this.total) {
      let url = 'products'
      if(this.categoryId)
        url += '/inCategory/' + this.categoryId
      let res = await this.props.api.get(url, {
        page: Math.floor(this.products.length / 20) + 1
      })
      res.rows.forEach(element => {
        this.products.push(element)
      });
      this.total = res.count
    }
  }

  render() {
    const data = this.products.slice()
    //console.log(data)
    return (
      <View style={{ flex: 1 }}>
        {this.category === 'wintersale' && <View style={styles.winterSale}>
          <Text style={[gstyles.upperText, { color: colors.darkText, fontSize: 25 }]}>Winter Sale</Text>
          <Text style={[gstyles.upperText, { color: colors.darkText, fontSize: 40 }]}>Up to 60% Off</Text>
        </View>}
        {this.category === 'men' && <View style={styles.menShoping}>
          <Text style={[gstyles.upperText, { color: 'white', fontSize: 45 }] }>Men</Text>
          <Text style={[gstyles.upperText, { color: 'white', fontSize: 20 }]}>Outwear</Text>
        </View>}
        {this.category === 'women' && <View style={styles.womenShoping}>
          <Text style={[gstyles.upperText, { color: 'white', fontSize: 45 }]}>Women</Text>
          <Text style={[gstyles.upperText, { color: 'white', fontSize: 20 }]}>Outwear</Text>
        </View>}
        <View style={{height: 70, width: '100%'}}>
          <CategoryList mainCategory={this.category} onCategoryChange={this.onCategoryChange}/>
        </View>
        
        <FlatList style={styles.flatList}
          data={data}
          renderItem={({ item }) => <ProductItem item={item} 
            onPress={() => this.props.navigation.navigate('ProductPage', {product_id: item.product_id})} />}
          keyExtractor={(item, index) => item.product_id.toString()}
          onEndReached={async() => await this.loadMoreProducts()}
        />
      </View>
    );
  }
}

class ProductItem extends PureComponent {
  render() {
    const {item} = this.props
    const discounted = (item.discounted_price > 0)
    return <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
      <View style={{ width: 120 }}></View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
          <Text style={{ ...gstyles.upperText, fontSize: 18 }}>{item.name}</Text>
          <View style={{ marginVertical: 30, flexDirection: 'row' }}>
            <Text style={styles.price}>${item.price} </Text>
            {discounted ? <Text style={styles.discountedPrice}> ${item.discounted_price} </Text> : null}
          </View>
          <View style={styles.buttonBar}>
            {discounted ? <View style={styles.barItem}>
              <Text style={{ ...gstyles.upperText, color: 'white', fontWeight: 'bold', }}>Sale</Text>
            </View> : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  }
}


const styles = StyleSheet.create({
  flatList: {
    //padding: 5
  },
  winterSale: {
    backgroundColor: 'white',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menShoping: {
    backgroundColor: colors.menColor,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  womenShoping: {
    backgroundColor: colors.womenColor,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 120,
    width: '100%',
    borderBottomColor: colors.lightText,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    ...gstyles.upperText,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightText
  },
  discountedPrice: {
    ...gstyles.upperText,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkText
  },
  buttonBar: {
    height: 32,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  barItem: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor:
      colors.yellow
  }
})

const pdata = {
  "count": 101,
  "rows": [
    {
      "product_id": 1,
      "name": "Arc d'Triomphe",
      "description": "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
      "price": "14.99",
      "discounted_price": "0.00",
      "thumbnail": "arc-d-triomphe-thumbnail.gif"
    },
    {
      "product_id": 2,
      "name": "Chartres Cathedral",
      "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
      "price": "16.95",
      "discounted_price": "15.95",
      "thumbnail": "chartres-cathedral-thumbnail.gif"
    },
    {
      "product_id": 3,
      "name": "Coat of Arms",
      "description": "There's good reason why the ship plays a prominent part on this shield!",
      "price": "14.50",
      "discounted_price": "0.00",
      "thumbnail": "coat-of-arms-thumbnail.gif"
    },
    {
      "product_id": 4,
      "name": "Gallic Cock",
      "description": "This fancy chicken is perhaps the most beloved of all French symbols. Unfortunately, there are only a few hundred left, so you'd better get your T-shirt now!",
      "price": "18.99",
      "discounted_price": "16.99",
      "thumbnail": "gallic-cock-thumbnail.gif"
    },
    {
      "product_id": 5,
      "name": "Marianne",
      "description": "She symbolizes the \"Triumph of the Republic\" and has been depicted many different ways in the history of France, as you will see below!",
      "price": "15.95",
      "discounted_price": "14.95",
      "thumbnail": "marianne-thumbnail.gif"
    },
    {
      "product_id": 6,
      "name": "Alsace",
      "description": "It was in this region of France that Gutenberg perfected his movable type. If he could only see what he started!",
      "price": "16.50",
      "discounted_price": "0.00",
      "thumbnail": "alsace-thumbnail.gif"
    },
    {
      "product_id": 7,
      "name": "Apocalypse Tapestry",
      "description": "One of the most famous tapestries of the Loire Valley, it dates from the 14th century. The T-shirt is of more recent vintage, however.",
      "price": "20.00",
      "discounted_price": "18.95",
      "thumbnail": "apocalypse-tapestry-thumbnail.gif"
    },
    {
      "product_id": 8,
      "name": "Centaur",
      "description": "There were never any lady centaurs, so these guys had to mate with nymphs and mares. No wonder they were often in such bad moods!",
      "price": "14.99",
      "discounted_price": "0.00",
      "thumbnail": "centaur-thumbnail.gif"
    },
    {
      "product_id": 9,
      "name": "Corsica",
      "description": "Borrowed from Spain, the \"Moor's head\" may have celebrated the Christians' victory over the Moslems in that country.",
      "price": "22.00",
      "discounted_price": "0.00",
      "thumbnail": "corsica-thumbnail.gif"
    },
    {
      "product_id": 10,
      "name": "Haute Couture",
      "description": "This stamp publicized the dress making industry. Use it to celebrate the T-shirt industry!",
      "price": "15.99",
      "discounted_price": "14.95",
      "thumbnail": "haute-couture-thumbnail.gif"
    },
    {
      "product_id": 11,
      "name": "Iris",
      "description": "Iris was the Goddess of the Rainbow, daughter of the Titans Thaumas and Electra. Are you up to this T-shirt?!",
      "price": "17.50",
      "discounted_price": "0.00",
      "thumbnail": "iris-thumbnail.gif"
    },
    {
      "product_id": 12,
      "name": "Lorraine",
      "description": "The largest American cemetery in France is located in Lorraine and most of the folks there still appreciate that fact.",
      "price": "16.95",
      "discounted_price": "0.00",
      "thumbnail": "lorraine-thumbnail.gif"
    },
    {
      "product_id": 13,
      "name": "Mercury",
      "description": "Besides being the messenger of the gods, did you know that Mercury was also the god of profit and commerce? This T-shirt is for business owners!",
      "price": "21.99",
      "discounted_price": "18.95",
      "thumbnail": "mercury-thumbnail.gif"
    },
    {
      "product_id": 14,
      "name": "County of Nice",
      "description": "Nice is so nice that it has been fought over for millennia, but now it all belongs to France.",
      "price": "12.95",
      "discounted_price": "0.00",
      "thumbnail": "county-of-nice-thumbnail.gif"
    },
    {
      "product_id": 15,
      "name": "Notre Dame",
      "description": "Commemorating the 800th anniversary of the famed cathedral.",
      "price": "18.50",
      "discounted_price": "16.99",
      "thumbnail": "notre-dame-thumbnail.gif"
    },
    {
      "product_id": 16,
      "name": "Paris Peace Conference",
      "description": "The resulting treaties allowed Italy, Romania, Hungary, Bulgaria, and Finland to reassume their responsibilities as sovereign states in international affairs and thus qualify for membership in the UN.",
      "price": "16.95",
      "discounted_price": "15.99",
      "thumbnail": "paris-peace-conference-thumbnail.gif"
    },
    {
      "product_id": 17,
      "name": "Sarah Bernhardt",
      "description": "The \"Divine Sarah\" said this about Americans: \"You are younger than we as a race, you are perhaps barbaric, but what of it? You are still in the molding. Your spirit is superb. It is what helped us wi...",
      "price": "14.99",
      "discounted_price": "0.00",
      "thumbnail": "sarah-bernhardt-thumbnail.gif"
    },
    {
      "product_id": 18,
      "name": "Hunt",
      "description": "A scene from \"Les Tres Riches Heures,\" a medieval \"book of hours\" containing the text for each liturgical hour of the day. This scene is from a 14th century painting.",
      "price": "16.99",
      "discounted_price": "15.95",
      "thumbnail": "hunt-thumbnail.gif"
    },
    {
      "product_id": 19,
      "name": "Italia",
      "description": "The War had just ended when this stamp was designed, and even so, there was enough optimism to show the destroyed oak tree sprouting again from its stump! What a beautiful T-shirt!",
      "price": "22.00",
      "discounted_price": "18.99",
      "thumbnail": "italia-thumbnail.gif"
    },
    {
      "product_id": 20,
      "name": "Torch",
      "description": "The light goes on! Carry the torch with this T-shirt and be a beacon of hope for the world!",
      "price": "19.99",
      "discounted_price": "17.95",
      "thumbnail": "torch-thumbnail.gif"
    }
  ]
}
