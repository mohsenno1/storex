import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { observable } from "mobx";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { observer, inject } from "mobx-react";
import { Image, Icon, Button, Header } from "react-native-elements";
import Diamond from "../../components/Diamond";
import { colors, gstyles } from "../../shared/Constants";
import PolygonIcon from "../../components/PolygonIcon";
import ItemColor from "../../components/ItemColor";
import ADIcon from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

@inject("api")
@observer
export default class ProductPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    if (params) this.product_id = params.product_id;
    this.animations = {
      customizeControl: {
        marginBottom: new Animated.Value(-250),
        opacity: new Animated.Value(0)
      }
    };
  }

  product_id = 1;
  @observable product = null; //= constProduct
  @observable currentImageId = 0;
  @observable customizePanelVisible = false;
  @observable sizeAttribs = [];
  @observable colorAttribs = [];
  @observable selectedColor;
  @observable selectedSize;
  @observable isLoading = false;

  async componentDidMount() {
    this.product = await this.props.api.get(`products/${this.product_id}`);
    let attribs = await this.props.api.get(
      `attributes/inProduct/${this.product_id}`
    );
    attribs.forEach(element => {
      if (element.attribute_name === "Size") {
        this.sizeAttribs.push(element);
        if (!this.selectedSize) this.selectedSize = element.attribute_value_id;
      } else {
        this.colorAttribs.push(element);
        if (!this.selectedColor)
          this.selectedColor = element.attribute_value_id;
      }
    });
  }

  async addToCart() {
    if (!this.selectedColor || !this.selectedSize) {
      alert("Item is not available");
      return;
    }
    try {
      this.isLoading = true;
      const size = this.sizeAttribs.find(x => x.attribute_value_id === this.selectedSize).attribute_value
      const color = this.colorAttribs.find(x => x.attribute_value_id === this.selectedColor).attribute_value
      await this.props.api.addToCart(this.product_id, `${size}, ${color}`);
      this.props.navigation.goBack();
    } catch (e) {
      alert(e);
    } finally {
      this.isLoading = false;
    }
  }

  onSnapToItem = index => {
    this.currentImageId = index;
  };

  toggleCustomizePanel = () => {
    if (this.customizePanelVisible) this.hideCustomizePanel();
    else this.showCustomizePanel();
  };

  showCustomizePanel = () => {
    Animated.parallel([
      Animated.timing(this.animations.customizeControl.opacity, { toValue: 1 }),
      Animated.timing(this.animations.customizeControl.marginBottom, {
        toValue: 0
      })
    ]).start();
    this.customizePanelVisible = true;
  };

  hideCustomizePanel = () => {
    Animated.parallel([
      Animated.timing(this.animations.customizeControl.opacity, { toValue: 0 }),
      Animated.timing(this.animations.customizeControl.marginBottom, {
        toValue: -300
      })
    ]).start();
    this.customizePanelVisible = false;
  };

  _renderItem({ item, index }) {
    return (
      <Image
        key={index}
        source={{
          uri: `https://mobilebackend.turing.com/images/products/${item}`
        }}
        style={{ resizeMode: "contain", width: "100%", height: "100%" }}
      />
    );
  }

  getAllProductImages(product) {
    let images = [];
    if (!product) return images;
    images.push(product.image);
    let i = 2;
    while (product[`image_${i}`]) {
      images.push(product[`image_${i}`]);
      i++;
    }
    return images;
  }

  render() {
    const product = this.product;
    const images = this.getAllProductImages(product);
    const discounted = product && product.discounted_price > 0;
    const colorAttribs = this.colorAttribs.slice();
    const sizeAttribs = this.sizeAttribs.slice();

    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={styles.headerStyle}
          leftComponent={
            product ? { text: product.name, style: styles.headerText } : null
          }
          centerComponent={null}
          rightComponent={
            <TouchableOpacity
              style={{ marginTop: -23 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <ADIcon name="close" size={30} color={colors.darkText} />
            </TouchableOpacity>
          }
        />
        {!product ? (
          <View style={{ ...gstyles.center, flex: 1 }}>
            <ActivityIndicator size="large" color={colors.lightGray} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={images}
                renderItem={this._renderItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                slideStyle={{ flex: 1 }}
                onSnapToItem={this.onSnapToItem}
              />
              <Pagination
                containerStyle={{ height: 30 }}
                dotsLength={images.length}
                activeDotIndex={this.currentImageId}
                dotElement={
                  <View style={{ width: 18 }}>
                    <Diamond color={colors.yellow} size={13} />
                  </View>
                }
                inactiveDotElement={
                  <View style={{ width: 18 }}>
                    <Diamond color="#d8d8d8" size={13} />
                  </View>
                }
              />
            </View>
            <View style={styles.descriptionBox}>
              <Text style={gstyles.textStyle}>{this.product.description}</Text>
            </View>
            <Animated.View
              style={[
                styles.customizeView,
                {
                  marginBottom: this.animations.customizeControl.marginBottom,
                  opacity: this.animations.customizeControl.opacity
                }
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    ...gstyles.upperText,
                    padding: 20,
                    paddingBottom: 0
                  }}
                >
                  Size
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 25
                  }}
                >
                  <ScrollView horizontal={true}>
                    {sizeAttribs.map(item => (
                      <TouchableOpacity
                        key={item.attribute_value_id}
                        style={{ margin: 5 }}
                        onPress={() => {
                          this.selectedSize = item.attribute_value_id;
                        }}
                      >
                        <PolygonIcon
                          color={
                            this.selectedSize === item.attribute_value_id
                              ? colors.yellow
                              : "none"
                          }
                          stroke={colors.lightText}
                          strokeWidth={2}
                          size={43}
                        >
                          <Text style={{ ...gstyles.upperText, fontSize: 18 }}>
                            {item.attribute_value}
                          </Text>
                        </PolygonIcon>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    ...gstyles.upperText,
                    padding: 20,
                    paddingBottom: 0
                  }}
                >
                  Color
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 25
                  }}
                >
                  <ScrollView horizontal={true}>
                    {colorAttribs.map(item => (
                      <TouchableOpacity
                        key={item.attribute_value_id}
                        style={{ margin: 5 }}
                        onPress={() => {
                          this.selectedColor = item.attribute_value_id;
                        }}
                      >
                        <ItemColor
                          color={item.attribute_value.toLowerCase()}
                          active={
                            this.selectedColor === item.attribute_value_id
                          }
                          strokeWidth={2}
                          size={40}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Animated.View>
            <View style={{ height: 60 }} />
            <View style={styles.buttonBar}>
              <TouchableOpacity
                style={{ flexDirection: "row", width: 100, height: "100%" }}
                onPress={this.toggleCustomizePanel}
              >
                <View style={styles.customize}>
                  <ADIcon
                    name={this.customizePanelVisible ? "down" : "up"}
                    size={20}
                  />
                  <Text style={{ ...gstyles.upperText }}>Customize</Text>
                </View>
              </TouchableOpacity>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 2, justifyContent: "center" }}>
                  {discounted ? (
                    <Text style={styles.discountedPrice}>
                      ${product.discounted_price}
                    </Text>
                  ) : null}
                  <Text style={styles.price}>${product.price}</Text>
                </View>
                <View style={{ flex: 3, justifyContent: "center" }}>
                  <Button
                    title="Add To Cart"
                    onPress={async () => await this.addToCart()}
                    buttonStyle={[gstyles.button, { height: 43 }]}
                    titleStyle={{ ...gstyles.upperText, color: "white" }}
                    containerStyle={gstyles.buttonContainer}
                    loading={this.isLoading}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.lightGray,
    height: 60,
    borderBottomColor: colors.black10,
    borderBottomWidth: 2
  },
  headerText: {
    color: colors.darkText,
    height: 50,
    fontWeight: "400",
    fontSize: 18,
    ...gstyles.upperText,
    width: 300
  },
  slide: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "blue"
  },
  descriptionBox: {
    height: 90,
    margin: 20,
    marginTop: 0,
    backgroundColor: colors.lightGray,
    padding: 10
  },
  buttonBar: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.lightGray,
    borderTopColor: colors.black10,
    borderTopWidth: 2,
    flexDirection: "row",
    zIndex: 10
  },
  customize: {
    flex: 1,
    ...gstyles.center,
    borderRightColor: colors.black10,
    borderRightWidth: 2
  },
  discountedPrice: {
    ...gstyles.upperText,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.lightText,
    textAlign: "right",
    paddingHorizontal: 5
  },
  price: {
    ...gstyles.upperText,
    fontSize: 22,
    fontWeight: "bold",
    color: colors.darkText,
    textAlign: "right",
    paddingHorizontal: 5
  },
  customizeView: {
    width: "100%",
    height: 250,
    backgroundColor: colors.lightGray,
    borderTopColor: colors.black10,
    borderTopWidth: 2,
    position: "absolute",
    bottom: 60
  }
});

const constProduct = {
  product_id: 1,
  name: "Arc d'Triomphe",
  description:
    "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
  price: "14.99",
  discounted_price: "12.00",
  thumbnail: "arc-d-triomphe-thumbnail.gif"
};
