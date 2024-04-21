class CustomerSupportSDK {
  isIframePresent = false;
  isReady = false;
  userData = null;
  userDataSet = false;

  MESSAGE_TYPES = {
    IS_READY: "is_ready",
    USER_DATA_READY: "user_data_ready",
    REQUESTING_USER_DATA: "requesting_user_data",
    SET_USER_DATA: "set_user_data",
    IS_CHATBOX_OPEN: "is_chatbox_open",
  };

  constructor(userCdnId, options) {
    if (this.isIframePresent) return;
    const iframe = document.createElement("IFRAME");
    const IFRAME_SRC =
      "https://customer-support-livechat-dot-apt-cubist-307713.ew.r.appspot.com";
    iframe.src = `${IFRAME_SRC}?userCdnId=${userCdnId}`;
    this.iframe = iframe;
    document.body.appendChild(this.iframe);
    this.isIframePresent = true;
    this.setStyles(options);

    const handleMessage = (event) => {
      if (event.origin !== IFRAME_SRC) return;

      if (event.data?.type === this.MESSAGE_TYPES.IS_READY) {
        console.log("SDK", event.data);
        this.isReady = true;
      } else if (event.data?.type === this.MESSAGE_TYPES.REQUESTING_USER_DATA) {
        console.log("SDK", event.data);
        this.sendMessage({
          type: this.MESSAGE_TYPES.SET_USER_DATA,
          data: this.userData,
        });
        this.userDataSet = true;
      } else if (event.data?.type === this.MESSAGE_TYPES.IS_CHATBOX_OPEN) {
        if (event.data.data) {
          this.iframe.style.boxShadow =
            "rgba(41, 43, 88, 0.2) 5.10258px 0.2052px 51.0258px";
        } else {
          this.iframe.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener("message", handleMessage);
  }

  sendMessage(data) {
    this.iframe.contentWindow.postMessage(data, "*");
  }

  setStyles(options) {
    this.iframe.frameBorder = "0";
    this.iframe.width = options?.width ?? "350px";
    this.iframe.height = options?.height ?? "555px";

    this.iframe.style.border = "0";
    this.iframe.style.position = "fixed";
    this.iframe.style.bottom = "40px";
    this.iframe.style.right = "40px";
    this.iframe.style.zIndex = options?.zIndex ?? 1000;
    this.iframe.style.borderRadius = "15px";
  }

  setUserData(userData) {
    if (!userData) {
      console.error("Customer Support SDK: no user data is provided");
      return;
    }

    if (this.userDataSet) return;

    this.userData = userData;

    if (this.isReady) {
      this.sendMessage({
        type: this.MESSAGE_TYPES.USER_DATA_READY,
      });
    } else {
      setTimeout(() => {
        this.sendMessage({
          type: this.MESSAGE_TYPES.USER_DATA_READY,
        });
      }, 1000);
      var intervalId = setInterval(() => {
        if (this.isReady) {
          this.sendMessage({
            type: this.MESSAGE_TYPES.USER_DATA_READY,
          });

          clearInterval(intervalId);
        }
      }, 200);
    }
  }
}

window.CustomerSupportSDK = CustomerSupportSDK;
