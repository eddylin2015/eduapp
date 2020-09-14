function getMathML(jax,callback) {
    var mml;
    try {
      //
      //  Try to produce the MathML (if an asynchronous
      //     action occurs, a reset error is thrown)
      //   Otherwise we got the MathML and call the
      //     user's callback passing the MathML.
      //
      mml = jax.root.toMathML("");
    } catch(err) {
      if (!err.restart) {throw err} // an actual error
      //
      //  For a delay due to file loading
      //    call this routine again after waiting for the
      //    the asynchronous action to finish.
      //
      return MathJax.Callback.After([getMathML,jax,callback],err.restart);
    }
    //
    //  Pass the MathML to the user's callback
    MathJax.Callback(callback)(mml);
  }