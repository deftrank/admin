// @ts-nocheck
import moment from 'moment';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

export const ProfilePicFolder = 'profilePic';


// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
//export const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));



/****Validate hastag
 * @param handtag - input hastag
 *  ********* */
export const validHashTag = (hastag) => {
  var pattern = /(#(?:[^\x00-\x7F]|\w)+)/g;
  return pattern.test(hastag);
};
/**** Local Image Path url
 * @param filePath - file pick by user
 */
export const localImageURL = (filePath) => {
  return URL.createObjectURL(filePath);
};

/****Generate Random String
 * @param length - length of string like 5 characters
 *  ********* */
export const generateAppID = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
/***Check valid json */
export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/***check valid number */
export const isValidNumber = (str) => {
  const pattern = /^[0-9\b]+$/;
  return pattern.test(str);
};

export const validEmail = (val) => {
  const pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return pattern.test(val);
};
/***Create uniqueID */
export const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  );
};

export const validYouTubeVimeoLink = (val) => {
  const pattern =
    /^(http\\:\/\/|https\\:\/\/)?((www\.)?(vimeo\.com\/)([0-9]+)$)|((www\.youtube\.com|youtu\.be)\/.+$)/;
  return pattern.test(val);
};
/**Conver html into plain string */
export const htmlToText = (val) => {
  return val.replace(/<[^>]+>/g, '');
};

export const validateEmpty = (str) => {
  return !str || str.length === 0;
};

//delete items from array
export const deleteItem = (itemData, idx) => {
  return itemData.filter((item) => item.uId !== idx);
};

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

export const debounce = (func, time) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, time);
  };
};

export const todayDate = () => {
  return moment(new Date()).format('yyyy-MM-DD');
};

export const currentTime = () => {
  return moment(new Date()).format('HH:mm');
};

export const getUserInfo = () => {
  let userData = secureLocalStorage.getItem(process.env.REACT_APP_USER_STORAGE_KEY);
  return userData;
};

export const getUserName = () => {
  let userData = secureLocalStorage.getItem(process.env.REACT_APP_USER_STORAGE_KEY);
  return userData ? userData.name : '';
};

export const selectValue = (data, value, isLabel) => {
  const valueIndex = data?.findIndex((item) => item.id === value);
  let valueAtIndex = '';
  if (isLabel) {
    valueAtIndex = data[valueIndex].label;
  }
  return isLabel ? valueAtIndex : valueIndex;
};

export const useOutsideAlerter = (ref, funCall) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        //setShowList(false);
        funCall();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export const diffDays = (lastDate) => {
  var startDate = Date.parse(lastDate);
  var endDate = Date.parse(todayDate());
  var timeDiff = Math.abs(startDate - endDate);
  var result = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return result;
};

/**Convert date time according to event calender below format*
 * new Date(2023, 7, 2, 8, 30, 0),
 * @author : Expertinasia Pvt. Ltd.
 */
export const convertUTCToLocalTime = (eventDate) => {
  var localTime = moment.utc(eventDate).toDate();
  let day = moment(localTime, 'YYYY/MM/DD').date();
  let month = moment(localTime, 'YYYY/MM/DD').month();
  let year = moment(localTime, 'YYYY/MM/DD').year();
  let hours = moment(localTime, 'YYYY/MM/DD HH:mm').hours();
  let minutes = moment(localTime, 'YYYY/MM/DD HH:mm').minutes();
  localTime = new Date(year, month, day, hours, minutes, 0);
  return localTime;
};



export const changeDate = (date) => {
  // Parse the ISO date string directly
  const localDate = moment(date).local();
  return localDate.format("DD/MM/YYYY"); // Use uppercase YYYY for year
};

export const makeAnArray = (n) => {
  return Array.from({ length: n }, (u, i) => i);
};