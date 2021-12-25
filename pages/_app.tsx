import App from "next/app";
import React from "react";
import "../styles/globals.scss";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
