
// Components
import Layer from '../assets/icons/layer';
import LayerBold from '../assets/icons/layer-bold';
import PersonsBold from '../assets/icons/persons-bold';
import Persons from '../assets/icons/persons';
import SettingsBold from '../assets/icons/settings-bold';
import Settings from '../assets/icons/settings';
import UserBold from '../assets/icons/user-bold';
import User from '../assets/icons/user';
import Plus from '../assets/icons/plus';
import ChevronRight from '../assets/icons/chevron-right';
import ChevronDown from '../assets/icons/chevron-down';
import Average from '../assets/icons/average';
import EditPerson from '../assets/icons/edit-person';
import Cup from '../assets/icons/cup';
import Trash from '../assets/icons/trash';
import AddPerson from '../assets/icons/add-person';
import Flag from '../assets/icons/flag';
import Hourglass from '../assets/icons/hourglass';
import Share from '../assets/icons/share';
import Config from '../assets/icons/config';
import Moon from '../assets/icons/moon';
import New from '../assets/icons/new';
import Help from '../assets/icons/help';
import List from '../assets/icons/list';
import ArrowBack from '../assets/icons/arrow-back';
import Dots from '../assets/icons/dots';
import Podium from '../assets/icons/podium';
import Points from '../assets/icons/points';
import TrendUp from '../assets/icons/trend-up';
import Close from '../assets/icons/close';
import Shuffle from '../assets/icons/shuffle';
import Palet from '../assets/icons/palet';
import Minus from '../assets/icons/minus';
import Check from '../assets/icons/check';
import CheckMark from '../assets/icons/check-mark';
import Warning from '../assets/icons/warning';

export default function IconComponent(props) {

  return (

    <>

    {
      props.name == "layer-bold" ?

      <LayerBold size={props.size} color={props.color} />

      : props.name == "layer" ?

      <Layer size={props.size} color={props.color} />

      :  props.name == "persons-bold" ?

      <PersonsBold size={props.size} color={props.color} />

      : props.name == "persons" ?

      <Persons size={props.size} color={props.color} />

      : props.name == "plus" ?

      <Plus size={props.size} color={props.color} />

      :  props.name == "settings-bold" ?

      <SettingsBold size={props.size} color={props.color} />

      : props.name == "settings" ?

      <Settings size={props.size} color={props.color} />

      : props.name == "user-bold" ?

      <UserBold size={props.size} color={props.color} />

      : props.name == "user" ?

      <User size={props.size} color={props.color} />

      : props.name == "add-person" ?

      <AddPerson size={props.size} color={props.color} />

      : props.name == "hourglass" ?

      <Hourglass size={props.size} color={props.color} />

      : props.name == "flag" ?

      <Flag size={props.size} color={props.color} />

      : props.name == "chevron-right" ?

      <ChevronRight size={props.size} color={props.color} />

      : props.name == "chevron-down" ?

      <ChevronDown size={props.size} color={props.color} />

      : props.name == "trash" ?

      <Trash size={props.size} color={props.color} />

      : props.name == "cup" ?

      <Cup size={props.size} color={props.color} />

      : props.name == "share" ?

      <Share size={props.size} color={props.color} />

      : props.name == "config" ?

      <Config size={props.size} color={props.color} />

      : props.name == "moon" ?

      <Moon size={props.size} color={props.color} />

      : props.name == "new" ?

      <New size={props.size} color={props.color} />

      : props.name == "help" ?

      <Help size={props.size} color={props.color} />

      : props.name == "list" ?

      <List size={props.size} color={props.color} />

      : props.name == "arrow-back" ?

      <ArrowBack size={props.size} color={props.color} />

      : props.name == "edit-person" ?

      <EditPerson size={props.size} color={props.color} />

      : props.name == "dots" ?

      <Dots size={props.size} color={props.color} />

      : props.name == "podium" ?

      <Podium size={props.size} color={props.color} />

      : props.name == "points" ?

      <Points size={props.size} color={props.color} />

      : props.name == "trend-up" ?

      <TrendUp size={props.size} color={props.color} />

      : props.name == "average" ?

      <Average size={props.size} color={props.color} />

      : props.name == "close" ?

      <Close size={props.size} color={props.color} />

      : props.name == "shuffle" ?

      <Shuffle size={props.size} color={props.color} />

      : props.name == "palet" ?

      <Palet size={props.size} color={props.color} />

      : props.name == "minus" ?

      <Minus size={props.size} color={props.color} />

      : props.name == "warning" ?

      <Warning size={props.size} color={props.color} />

      : props.name == "check" ?

      <Check size={props.size} color={props.color} />

      : props.name == "check-mark" ?

      <CheckMark size={props.size} color={props.color} />

      : null

    }

    </>

  );

}
