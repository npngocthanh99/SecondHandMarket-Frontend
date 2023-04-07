import axios from "axios";



export const getUsers = async () => {
  try {
    const { data } = await axios.get('/admin/user');
    // console.log('getUser:::;', data.data)
    return data.data;
  } catch (error) {
    console.log('error_getUserInfo:::', error);
  }
}

export const removeUser = async (id) => {
  try {
    const { data } = await axios.delete(`/admin/user/remove/userId/${id}`);
    return data.data;
  } catch (error) {
    console.log('error_removeUser:::', error)
  }
}

export const getRevenueByUser = async (isWithdrew) => {
  try {
    const { data } = await axios.get(`/user/revenue/isWithdrew/${isWithdrew}`,
      {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
    return data.data;
  } catch (error) {
    console.log('err_getRevenueByUser:::', error);
  }
}

export const withdrawByUser = async (isWithdrew) => {
  try {
    const { data } = await axios.put('/user/revenue',
      {
        isWithdrew
      },
      {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
    return !!data.data;
  } catch (error) {
    console.log('err_withdrawByUser:::', error);
  }
}

export const searchUserByLastname = async (lastName) => {
  try {
    const { data } = await axios.get(`/admin/user/search/lastName/${lastName}`);
    return data.data
  } catch (error) {
    console.log('err_searchUserByLastname', error);
  }
}

export const getPosts = async () => {
  try {
    const { data } = await axios.get('/admin/post');
    return data.data;
  } catch (error) {
    console.log('err_getPosts', error);
  }
}

export const removePostByPostId = async (id) => {
  try {
    const { data } = await axios.delete(`/admin/post/remove/postId/${id}`);
    console.log('removePostByPostId::', data.data);
    return data.data;
  } catch (error) {
    console.log('err_removePostByPostId:::', error);
  }
}

export const searchPostByTitle = async (title) => {
  try {
    const { data } = await axios.get(`/admin/post/search/title/${title}`);
    return data.data;
  } catch (error) {
    console.log('err_searchPostByTitle:::', error);
  }
}

export const getParentCategories = async (parentCate) => {
  try {
    const { data } = await axios.get(`/admin/category/parentCate/${parentCate}`);
    return data.data;
  } catch (error) {
    console.log('err_getParentCategories::', error);
  }
}


export const addCategory = async (formData) => {
  try {
    const { data } = await axios.post('/admin/category/create',
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        }
      }
    );
    return !!data.data
  } catch (error) {
    console.log('err_addCategory:::', error)
  }
}

export const removeCateById = async (id) => {
  try {
    const { data } = await axios.delete(`/admin/category/remove/${id}`);
    return data.data;
  } catch (error) {
    console.log('err_removeCateById::', error)
  }
}

export const updateCategory = async (formData) => {
  try {
    const { data } = await axios.put('/admin/category/update/', formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        }
      });
    return !!data.data;
  } catch (error) {
    console.log('err_updateCategory:::', error);
  }
}


export const getCategoryById = async (id) => {
  try {
    const { data } = await axios.get(`/admin/category/${id}`);
    console.log('cate::::::', data.data)
    return data.data;
  } catch (error) {
    console.log('err_getCategory:::', error)
  }
}

export const getPostingBuyByUser = async (status) => {
  try {
    const { data } = await axios.get(`/user/order/posting/buy/status/${status}`, {
      headers: {
        Authorization: localStorage["access_token"],
      },
    });
    console.log('listPostingbuy', data.data);
    return data.data
  } catch (error) {
    console.log('err_getOrderPostingByUsr:::', error);
  }
}

export const updateStatusPostingCart = async (status) => {
  try {
    const { data } = await axios.put('/user/cart/', {
      status,
    },
      {
        headers: {
          Authorization: localStorage["access_token"],
        },
      })
    return data.data;
  } catch (error) {
    console.log('err_updateStatusPostingCart:::', error);

  }
}

export const createOrder = async () => {
  try {
    const { data } = await axios.get('/user/order/create',
      {
        headers: {
          Authorization: localStorage["access_token"],
        }
      }
    );

    return !!data.data;

  } catch (error) {

  }
}

export const getPostIdsCheckoutbyUser = async (checked) => {
  try {
    const { data } = await axios.get(`/user/cart/checked/${checked}`,
      {
        headers: {
          Authorization: localStorage["access_token"],
        },
      })
    return data.data
  } catch (error) {
    console.log('err_getPostIdCheckoutByuser:::', error);
  }
}

export const getUserInfoByUser = async () => {
  try {
    const { data } = await axios.get('/user/userInfo',
      {
        headers: {
          Authorization: localStorage["access_token"],
        }
      });
    console.log('getUserInfor:::', data.data)
    return data.data
  } catch (error) {

  }
}