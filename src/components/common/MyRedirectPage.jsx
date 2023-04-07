import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';


function MyRedirectPage() {

  const pageUrl = useSelector((state) => state.pageUrl.search);



  useEffect(
    () => {
      // setTimeout(() => {
      //   window.location.replace(pageUrl);
      // }, 1000)
      window.location.replace(localStorage['page_url']);

    }, []
  )

  return (
    <div>MyRedirectPage</div>
  )
}

export default MyRedirectPage