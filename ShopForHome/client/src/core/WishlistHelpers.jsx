export const addWishItem = (item = [], count = 0, next = (f) => f) => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
      }
      wishlist.push({
        ...item,
        count: 1,
      });
  
  
  
      wishlist = Array.from(new Set(wishlist.map((p) => p._id))).map((id) => {
        return wishlist.find((p) => p._id === id);
      });
  
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      next();
    }
  };
  
  export const itemWishTotal = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        return JSON.parse(localStorage.getItem('wishlist')).length;
      }
    }
    return 0;
  };
  
  export const getWishlist = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        return JSON.parse(localStorage.getItem('wishlist'));
      }
    }
    return [];
  };
  
  export const updateWishItem = (productId, count) => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
      }
  
      wishlist.map((product, i) => {
        if (product._id === productId) {
          wishlist[i].count = count;
        }
      });
  
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };
  
  export const removeWishItem = (productId) => {
    let wishlist = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
      }
  
      wishlist.map((product, i) => {
        if (product._id === productId) {
          wishlist.splice(i, 1);
        }
      });
  
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    return wishlist;
  };
  
  export const emptyWishlist = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wishlist');
      next();
    }
  };
  