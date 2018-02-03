  //shoppingCart structure
  [{
    name: name,
    item: item,
    price: price,
    quantity: quantity
  }]
  
  //shopping cart items
  $rootScope.individualItemsInShoppingCart = [];
  $rootScope.shoppingCartItems = [];
  $rootScope.cartIndex = 0;
  $scope.incrementCartItem = (item) => {
    task.increment(item);
  }
  $scope.decrementCartItem = (item) => {
    task.decrement(item);
  }
  $scope.removeItemFromShoppingCart = (item) => {
    task.removeItemFromShoppingCart(item);
  }
  
  //task service
  $rootScope.checkoutItemsTotal;
    this.decrement = (item) => {
    let arrayIndex;
    const index = this.findIndexInArrayByIndex(item.index, $rootScope.shoppingCartItems);
    $rootScope.shoppingCartItems[index].quantity--;
    if($rootScope.shoppingCartItems[index].quantity === 0){
      $rootScope.shoppingCartItems.splice(index, 1);
      $rootScope.individualItemsInShoppingCart.map((img, i) => {
        if(img === item.img){
          arrayIndex = i;
        }
      })
      $rootScope.individualItemsInShoppingCart.splice(arrayIndex, 1);
    }
  }
  this.increment = (item) => {
    const index = this.findIndexInArrayByIndex(item.index, $rootScope.shoppingCartItems);
    $rootScope.shoppingCartItems[index].quantity++;
  }
  this.findIndexInArrayByIndex = (index, parentArray) => {
    let foundIndex = 'not found';
    parentArray.map((item, i) => {
      if(item.index == index){
        foundIndex = i;
      }
    })
    return foundIndex;
  }
  this.addToShoppingCart = (item) => {
    const isInShoppingCart = $rootScope.individualItemsInShoppingCart.includes(item.img);
    if(isInShoppingCart){
      $rootScope.shoppingCartItems.map((shoppingCartItem) => {
        if(shoppingCartItem.img === item.img){
          shoppingCartItem.quantity++;
        }
      })
    } else {
      const img = item.img;
      const price = item.price;
      const name = item.name;
      const imgObj = { name: name, img: img, price: price, quantity: 1, index: $rootScope.cartIndex }
      $rootScope.cartIndex++;
      $rootScope.shoppingCartItems.push(imgObj);
      $rootScope.individualItemsInShoppingCart.push(img);
    }
    console.log($rootScope.shoppingCartItems);
    console.log($rootScope.individualItemsInShoppingCart);
  }
  this.removeItemFromShoppingCart = (item) => {
    let arrayIndex;
    const index = this.findIndexInArrayByIndex(item.index, $rootScope.shoppingCartItems);
    $rootScope.shoppingCartItems.splice(index, 1);
    $rootScope.individualItemsInShoppingCart.map((img, i) => {
      if(img === item.img){
        arrayIndex = i;
      }
    })
    $rootScope.individualItemsInShoppingCart.splice(arrayIndex, 1);
  }
  this.checkoutItemsTotal = () => {
    const calculateTotal = () => {
      let total = 0;
      $rootScope.shoppingCartItems.map((item) => {
        const price = item.price.substring(1, item.price.length);
        total += (parseInt(price) * parseInt(item.quantity));
      })
      $rootScope.checkoutItemsTotal = total;
    }
    $interval(() => {
      calculateTotal();
    })
  }
  
