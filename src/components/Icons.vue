<template>
  <span v-on="$listeners">
    <component
      :is="name"
      :width="width"
      :height="height"
      :color="color"
    />
  </span>
</template>

<script>
import circleBlock from './icons/circleBlock';
import creditCard from './icons/creditCard';
import arrowDown from './icons/arrowDown';
import briefcase from './icons/briefcase';
import clipboard from './icons/clipboard';
import newspaper from './icons/newspaper';
import stopwatch from './icons/stopwatch';
import caretDown from './icons/caretDown';
import userPlus from './icons/userPlus';
import calendar from './icons/calendar';
import sortDown from './icons/sortDown';
import envelope from './icons/envelope';
import airplane from './icons/airplane';
import statsBar from './icons/statsBar';
import userTie from './icons/userTie';
import pushpin from './icons/pushpin';
import blocked from './icons/blocked';
import account from './icons/account';
import hamburger from './icons/menu';
import aidKit from './icons/aidKit';
import sortUp from './icons/sortUp';
import search from './icons/search';
import office from './icons/office';
import trophy from './icons/trophy';
import ticket from './icons/ticket';
import write from './icons/write';
import users from './icons/users';
import close from './icons/close';
import logo from './icons/logo';
import moon from './icons/moon';
import done from './icons/done';
import sort from './icons/sort';
import home from './icons/home';
import cogs from './icons/cogs';
import bell from './icons/bell';
import tree from './icons/tree';
import cart from './icons/cart';
import lock from './icons/lock';
import key from './icons/key';
import bin from './icons/bin';

export default {
  name: 'AppIcons',

  props: {
    name: {
      type: String,
      default: 'moon'
    },
    width: {
      type: String,
      default: 'w-4'
    },
    height: {
      type: String,
      default: 'h-4'
    },
    color: {
      type: String,
      default: 'text-gray-800'
    }
  },

  components: {
    circleBlock,
    creditCard,
    hamburger,
    arrowDown,
    caretDown,
    briefcase,
    clipboard,
    newspaper,
    stopwatch,
    sortDown,
    envelope,
    calendar,
    airplane,
    statsBar,
    userPlus,
    account,
    pushpin,
    userTie,
    blocked,
    sortUp,
    aidKit,
    search,
    office,
    trophy,
    ticket,
    write,
    users,
    close,
    logo,
    moon,
    done,
    sort,
    home,
    cogs,
    bell,
    tree,
    cart,
    lock,
    bin,
    key
  }
};
</script>
