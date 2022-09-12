/*
 rangeSlider v1.1 (https://github.com/danielcebrian/rangeSlider-videojs)
 Copyright (C) 2014 Daniel Cebrián Robles
 License GNU: https://github.com/danielcebrian/rangeSlider-videojs/blob/master/License-GNU.rst
 License Apache: https://github.com/danielcebrian/rangeSlider-videojs/blob/master/License-Apache.rst
 - GNU
 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 - APACHE
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
//----------------Load Plugin----------------//

const Plugin = videojs.getPlugin('plugin');
const Component = videojs.getComponent("Component");

var _vjs4 = {
  on : function (element, eventName, func, flag) {
    element.addEventListener(eventName, func, flag);
  },
  off : function (element, eventName, func, flag) {
    element.removeEventListener(eventName, func, flag);
  },
  addClass : function (element, className) {
    element.classList.add(className);
  },
  removeClass : function (element, className) {
    element.classList.remove(className);
  },
  findPosition : function (element) {
    return element.getBoundingClientRect();
  },
  round : function (n, precision) {
    return parseFloat(n.toFixed(precision));
  },
  formatTime : function (totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60).toFixed(0);
    var seconds = (totalSeconds % 60).toFixed(0);

    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }

    return minutes + ':' + seconds;
  },
  blockTextSelection : function () {
    // TODO
  }
};

/**
 * This is the control right time panel
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class ControlTimePanelRight extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

    this.on('keyup', this.onKeyUp);
    this.on('keydown', this.onKeyDown);
  }

  init_(){
    this.rs = this.player_.rangeslider;
    this.timeOld = {};
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-controltimepanel-right-RS',
      innerHTML: 'End: <input type="text" id="controltimepanel" maxlength="2" value="00"/>:<input type="text" id="controltimepanel" maxlength="2" value="00"/>:<input type="text" id="controltimepanel" maxlength="2" value="00"/>'
    });
  };

  onKeyDown(event) {
    this.timeOld[0] = this.el_.children[0].value;
    this.timeOld[1] = this.el_.children[1].value;
    this.timeOld[2] = this.el_.children[2].value;
  };

  onKeyUp(event) {
    this.rs._checkControlTime(1, this.el_.children, this.timeOld);
  };
}

/**
 * This is the control left time panel
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class ControlTimePanelLeft extends Component{
  /** @constructor */
  constructor(player, options) {
    super(player, options);

    this.on('keyup', this.onKeyUp);
    this.on('keydown', this.onKeyDown);
  }

  init_(){
    this.rs = this.player_.rangeslider;
    this.timeOld = {};
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-controltimepanel-left-RS',
      innerHTML: 'Start: <input type="text" id="controltimepanel" maxlength="2" value="00"/>:<input type="text" id="controltimepanel" maxlength="2" value="00"/>:<input type="text" id="controltimepanel" maxlength="2" value="00"/>'
    });
  };

  onKeyDown(event) {
    this.timeOld[0] = this.el_.children[0].value;
    this.timeOld[1] = this.el_.children[1].value;
    this.timeOld[2] = this.el_.children[2].value;
  };

  onKeyUp(event) {
    this.rs._checkControlTime(0, this.el_.children, this.timeOld);
  }
}


/**
 * This is the control time panel
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class ControlTimePanel extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);
  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-controltimepanel-RS vjs-control',
    });
  }

  enable(enable) {
    enable = typeof enable != 'undefined' ? enable : true;
    this.rs.ctpl.el_.children[0].disabled = enable ? "" : "disabled";
    this.rs.ctpl.el_.children[1].disabled = enable ? "" : "disabled";
    this.rs.ctpl.el_.children[2].disabled = enable ? "" : "disabled";
    this.rs.ctpr.el_.children[0].disabled = enable ? "" : "disabled";
    this.rs.ctpr.el_.children[1].disabled = enable ? "" : "disabled";
    this.rs.ctpr.el_.children[2].disabled = enable ? "" : "disabled";
  }
}

ControlTimePanel.prototype.options_ = {
  children: [
    'ControlTimePanelLeft',
    'ControlTimePanelRight'
  ]
};

/**
 * This is the left time panel
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class TimePanelLeft extends Component{
  /** @constructor */
  constructor(player, options) {
    super(player, options);

  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-timepanel-left-RS',
      innerHTML: '<span class="vjs-time-text" id="Start">00:00</span>'
    });
  };
}


/**
 * This is the right time panel
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class TimePanelRight extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-timepanel-right-RS',
      innerHTML: '<span class="vjs-time-text" id="End">00:00</span>'
    });
  }
}

//-- Design the new components

/**
 * Range Slider Time Bar
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class RSTimeBar extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);
  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-timebar-RS',
      innerHTML: ''
    });
  }
}

RSTimeBar.prototype.options_ = {
  children: [
    'SeekRSBar',
  ]
};

/**
 * Seek Range Slider Bar and holder for the selection bars
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class SeekRSBar extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

    this.on('mousedown', this.onMouseDown);
  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-rangeslider-holder'
    });
  }

  onMouseDown(event) {
    event.preventDefault();
    _vjs4.blockTextSelection();

    if (!this.rs.options.locked) {
      _vjs4.on(document, "mousemove", videojs.bind(this, this.onMouseMove));
      _vjs4.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
    }
  }

  onMouseUp(event) {
    _vjs4.off(document, "mousemove", this.onMouseMove, false);
    _vjs4.off(document, "mouseup", this.onMouseUp, false);
  }

  onMouseMove(event) {
    var left = this.calculateDistance(event);

    if (this.rs.left.pressed)
      this.setPosition(0, left);
    else if (this.rs.right.pressed)
      this.setPosition(1, left);

    //Fix a problem with the presition in the display time
    var ctd = this.player_.controlBar.currentTimeDisplay;
    // ctd.contentEl_.innerHTML = '<span class="vjs-control-text">' + ctd.localize('Current Time') + '</span>' + _vjs4.formatTime(this.rs._seconds(left), this.player_.duration());

    // Trigger slider change
    if (this.rs.left.pressed || this.rs.right.pressed) {
      this.rs._triggerSliderChange();
    }
  }

  setPosition(index, left, writeControlTime) {
    writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;
    //index = 0 for left side, index = 1 for right side
    index = index || 0;

    // Position shouldn't change when handle is locked
    // console.log("123", this.player_, this.player_.options, Object.keys(this.rs), this.rs.options)
    if (this.rs.options.locked)
      return false;

    // Check for invalid position
    if (isNaN(left))
      return false;

    // Check index between 0 and 1
    if (!(index === 0 || index === 1))
      return false;

    // Alias
    var ObjLeft = this.rs.left.el_,
      ObjRight = this.rs.right.el_,
      Obj = this.rs[index === 0 ? 'left' : 'right'].el_,
      tpr = this.rs.tpr.el_,
      tpl = this.rs.tpl.el_,
      bar = this.rs.bar;
    // ctp = this.rs[index === 0 ? 'ctpl' : 'ctpr'].el_;

    //Check if left arrow is passing the right arrow
    if ((index === 0 ? bar.updateLeft(left) : bar.updateRight(left))) {

      Obj.style.left = (left * 100) + '%';

      if (index === 0) {
        bar.updateLeft(left);
      }else{
        bar.updateRight(left);
      }

      this.rs[index === 0 ? 'start' : 'end'] = this.rs._seconds(left);

      //Fix the problem  when you press the button and the two arrow are underhand
      //left.zIndex = 10 and right.zIndex=20. This is always less in this case:
      if (index === 0) {
        if ((left) >= 0.9)
          ObjLeft.style.zIndex = 25;
        else
          ObjLeft.style.zIndex = 10;
      }

      //-- Panel
      var TimeText = _vjs4.formatTime(this.rs._seconds(left)),
        tplTextLegth = tpl.children[0].innerHTML.length;
      var MaxP, MinP, MaxDisP;
      if (tplTextLegth <= 4) //0:00
        MaxDisP = this.player_.isFullScreen ? 3.25 : 6.5;
      else if (tplTextLegth <= 5)//00:00
        MaxDisP = this.player_.isFullScreen ? 4 : 8;
      else//0:00:00
        MaxDisP = this.player_.isFullScreen ? 5 : 10;
      if (TimeText.length <= 4) { //0:00
        MaxP = this.player_.isFullScreen ? 97 : 93;
        MinP = this.player_.isFullScreen ? 0.1 : 0.5;
      } else if (TimeText.length <= 5) {//00:00
        MaxP = this.player_.isFullScreen ? 96 : 92;
        MinP = this.player_.isFullScreen ? 0.1 : 0.5;
      } else {//0:00:00
        MaxP = this.player_.isFullScreen ? 95 : 91;
        MinP = this.player_.isFullScreen ? 0.1 : 0.5;
      }

      if (index === 0) {
        tpl.style.left = Math.max(MinP, Math.min(MaxP, (left * 100 - MaxDisP / 2))) + '%';

        if ((tpr.style.left.replace("%", "") - tpl.style.left.replace("%", "")) <= MaxDisP)
          tpl.style.left = Math.max(MinP, Math.min(MaxP, tpr.style.left.replace("%", "") - MaxDisP)) + '%';
        tpl.children[0].innerHTML = TimeText;
      } else {
        tpr.style.left = Math.max(MinP, Math.min(MaxP, (left * 100 - MaxDisP / 2))) + '%';

        if (((tpr.style.left.replace("%", "") || 100) - tpl.style.left.replace("%", "")) <= MaxDisP)
          tpr.style.left = Math.max(MinP, Math.min(MaxP, tpl.style.left.replace("%", "") - 0 + MaxDisP)) + '%';
        tpr.children[0].innerHTML = TimeText;
      }
      //-- Control Time
      if (writeControlTime) {
        var time = TimeText.split(":"),
          h, m, s;
        if (time.length == 2) {
          h = 0;
          m = time[0];
          s = time[1];
        } else {
          h = time[0];
          m = time[1];
          s = time[2];
        }
        // ctp.children[0].value = h;
        // ctp.children[1].value = m;
        // ctp.children[2].value = s;
      }
    }
    return true;
  }
  calculateDistance(event) {
    var rstbX = this.getRSTBX();
    var rstbW = this.getRSTBWidth();
    var handleW = this.getWidth();

    // Adjusted X and Width, so handle doesn't go outside the bar
    rstbX = rstbX + (handleW / 2);
    rstbW = rstbW - handleW;

    // Percent that the click is through the adjusted area
    return Math.max(0, Math.min(1, (event.pageX - rstbX) / rstbW));
  }

  getRSTBWidth() {
    return this.el_.offsetWidth;
  }

  getRSTBX() {
    return _vjs4.findPosition(this.el_).left;
  }

  getWidth() {
    return this.rs.left.el_.offsetWidth;//does not matter left or right
  }
}

SeekRSBar.prototype.options_ = {
  children: [
    'SelectionBar',
    'SelectionBarLeft',
    'SelectionBarRight',
    'TimePanel'
  ]
};

/**
 * This is the bar with the selection of the rangeSlider
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class SelectionBar extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

    this.on('mouseup', this.onMouseUp);
    _vjs4.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
    this.fired = false;
  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-selectionbar-RS'
    });
  }

  onMouseUp(event) {
    var start = this.rs.left.el_.style.left.replace("%", ""),
      end = this.rs.right.el_.style.left.replace("%", ""),
      duration = this.player_.duration(),
      precision = this.rs.updatePrecision,
      segStart = _vjs4.round(start * duration / 100, precision),
      segEnd = _vjs4.round(end * duration / 100, precision);

    let current = this.player_.currentTime()
    // console.log("006", current, segStart, segEnd, ((segStart >= current) || (segEnd <= current)))
    if ((segStart >= (current-0.5)) || (segEnd <= (current+0.5))){
      // console.log("007", current, segStart, segEnd)
      this.player_.currentTime(segStart);
      this.player_.play();
      this.rs.bar.activatePlay(segStart, segEnd);
    }
  }

  updateLeft(left) {
    var rightVal = this.rs.right.el_.style.left !== '' ? this.rs.right.el_.style.left : 100;
    var right = parseFloat(rightVal) / 100;

    var width = _vjs4.round((right - left), this.rs.updatePrecision); //round necessary for not get 0.6e-7 for example that it's not able for the html css width

    //(right+0.00001) is to fix the precision of the css in html
    if (left <= (right + 0.00001)) {
      this.rs.bar.el_.style.left = (left * 100) + '%';
      this.rs.bar.el_.style.width = (width * 100) + '%';
      return true;
    }
    return false;
  }

  updateRight(right) {
    var leftVal = this.rs.left.el_.style.left !== '' ? this.rs.left.el_.style.left : 0;
    var left = parseFloat(leftVal) / 100;

    var width = _vjs4.round((right - left), this.rs.updatePrecision);//round necessary for not get 0.6e-7 for example that it's not able for the html css width

    //(right+0.00001) is to fix the precision of the css in html
    if ((right + 0.00001) >= left) {
      this.rs.bar.el_.style.width = (width * 100) + '%';
      this.rs.bar.el_.style.left = ((right - width) * 100) + '%';
      return true;
    }
    return false;
  }

  activatePlay(start, end) {
    this.timeStart = start;
    this.timeEnd = end;

    this.suspendPlay();

    this.player_.on("timeupdate", videojs.bind(this, this._processPlay));
  }

  suspendPlay() {
    this.fired = false;
    this.player_.off("timeupdate", videojs.bind(this, this._processPlay));
  }

  _processPlay() {
    //Check if current time is between start and end
    if (this.player_.currentTime() >= this.timeStart && (this.timeEnd < 0 || this.player_.currentTime() < this.timeEnd)) {
      if (this.fired) { //Do nothing if start has already been called
        return;
      }
      this.fired = true; //Set fired flag to true
    } else {
      if (!this.fired) { //Do nothing if end has already been called
        return;
      }
      this.fired = false; //Set fired flat to false
      this.player_.pause(); //Call end function
      this.player_.currentTime(this.timeEnd);
      this.suspendPlay();
    }
  }

  process_loop() {
    var player = this.player;

    if (player && this.looping) {
      // console.log("004!", this.looping, this.timeStart, this.timeEnd)
      var current_time = player.currentTime();

      if (current_time < this.timeStart || this.timeEnd > 0 && this.timeEnd < current_time) {
        player.currentTime(this.timeStart);
      }
    }
  }
}


/**
 * This is the left arrow to select the rangeSlider
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class SelectionBarLeft extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

    this.on('mousedown', this.onMouseDown);
    this.pressed = false;
  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-rangeslider-handle vjs-selectionbar-left-RS',
      innerHTML: '<div class="vjs-selectionbar-arrow-RS"></div><div class="vjs-selectionbar-line-RS"></div>'
    });
  }

  onMouseDown(event) {
    event.preventDefault();
    _vjs4.blockTextSelection();
    if (!this.rs.options.locked) {
      this.pressed = true;
      _vjs4.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
      _vjs4.addClass(this.el_, 'active');
    }
  }

  onMouseUp(event) {
    _vjs4.off(document, "mouseup", this.onMouseUp, false);
    _vjs4.removeClass(this.el_, 'active');
    if (!this.rs.options.locked) {
      this.pressed = false;
    }
  }
}


/**
 * This is the right arrow to select the rangeSlider
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class SelectionBarRight extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

    this.on('mousedown', this.onMouseDown);
    this.pressed = false;
  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-rangeslider-handle vjs-selectionbar-right-RS',
      innerHTML: '<div class="vjs-selectionbar-arrow-RS"></div><div class="vjs-selectionbar-line-RS"></div>'
    });
  }

  onMouseDown(event) {
    event.preventDefault();
    _vjs4.blockTextSelection();
    if (!this.rs.options.locked) {
      this.pressed = true;
      _vjs4.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
      _vjs4.addClass(this.el_, 'active');
    }
  }

  onMouseUp(event) {
    _vjs4.off(document, "mouseup", this.onMouseUp, false);
    _vjs4.removeClass(this.el_, 'active');
    if (!this.rs.options.locked) {
      this.pressed = false;
    }
  }
}

/**
 * This is the time panel
 * @param {videojs.Player|Object} player
 * @param {Object=} options

 */
class TimePanel extends Component {
  /** @constructor */
  constructor(player, options) {
    super(player, options);

  }

  init_(){
    this.rs = this.player_.rangeslider;
  }

  createEl() {
    return super.createEl('div', {
      className: 'vjs-timepanel-RS'
    });
  }
}
TimePanel.prototype.options_ = {
  children: [
    'TimePanelLeft',
    'TimePanelRight',
  ]
};

class rangeSlider_ extends Plugin{
  constructor(player, options ={}) {
    super(player, options);
    var player = player;

    // console.log("=== rangeSlider_ constructor ===")

    // console.log("00", player, player.rangeSlider)
    player.rangeslider = new RangeSlider(player, options);
    // console.log("01", player, player.rangeslider.options)

    //When the DOM and the video media is loaded
    function initialVideoFinished(event) {
      // console.log("011", this.rangeslider)
      var plugin = player.rangeslider;
      // console.log("02", player, player.rangeslider)
      //All components will be initialize after they have been loaded by videojs
      for (var index in plugin.components) {
        // console.log("03", index, plugin.components[index])
        plugin.components[index].init_();
      }

      if (plugin.options.hidden)
        plugin.hide(); //Hide the Range Slider

      if (plugin.options.locked)
        plugin.lock(); //Lock the Range Slider

      if (plugin.options.panel === false)
        plugin.hidePanel(); //Hide the second Panel

      // if (plugin.options.controlTime === false)
      //     plugin.hidecontrolTime(); //Hide the control time panel

      plugin._reset();
      player.trigger('loadedRangeSlider'); //Let know if the Range Slider DOM is ready
    }

    player.one('playing', initialVideoFinished);

  }
}

class RangeSlider {

  constructor(_player, options = {}) {
    var player = _player || this;
    this.player = player;

    this.components = {}; // holds any custom components we add to the player

    options = options || {}; // plugin options

    if (!options.hasOwnProperty('locked'))
      options.locked = false; // lock slider handles

    if (!options.hasOwnProperty('hidden'))
      options.hidden = true; // hide slider handles

    if (!options.hasOwnProperty('panel'))
      options.panel = true; // Show Second Panel

    this.options = options;

    this.init();

    if (options.hidden)
      this.hide(); //Hide the Range Slider

    if (options.locked)
      this.lock(); //Lock the Range Slider

    if (options.panel === false)
      this.hidePanel(); //Hide the second Panel

  }

  dispose() {
    super.dispose();
    videojs.log('the rangeSlider plugin is being disposed');
  }

  updateState() {
    this.setState({playing: !this.player.paused()});
  }

  logState(changed) {
    videojs.log(`the player is now ${this.state.playing ? 'playing' : 'paused'}`);
  }

  init() {
    var player = this.player || {};

    this.updatePrecision = 3;

    //position in second of the arrows
    this.start = 0;
    this.end = 0;

    //components of the plugin
    var controlBar = player.controlBar;
    var seekBar = controlBar.progressControl.seekBar;
    this.components.RSTimeBar = seekBar.RSTimeBar;
    // this.components.ControlTimePanel = controlBar.ControlTimePanel;

    //Save local component
    this.rstb = this.components.RSTimeBar;
    this.box = this.components.SeekRSBar = this.rstb.SeekRSBar;
    this.bar = this.components.SelectionBar = this.box.SelectionBar;
    this.left = this.components.SelectionBarLeft = this.box.SelectionBarLeft;
    this.right = this.components.SelectionBarRight = this.box.SelectionBarRight;
    this.tp = this.components.TimePanel = this.box.TimePanel;
    this.tpl = this.components.TimePanelLeft = this.tp.TimePanelLeft;
    this.tpr = this.components.TimePanelRight = this.tp.TimePanelRight;
    // this.ctp = this.components.ControlTimePanel;
    // this.ctpl = this.components.ControlTimePanelLeft = this.ctp.ControlTimePanelLeft;
    // this.ctpr = this.components.ControlTimePanelRight = this.ctp.ControlTimePanelRight;

  }

  lock() {
    this.options.locked = true;
    // this.ctp.enable(false);
    if (typeof this.box != 'undefined')
      _vjs4.addClass(this.box.el_, 'locked');
  }

  unlock() {
    this.options.locked = false;
    // this.ctp.enable();
    if (typeof this.box != 'undefined')
      _vjs4.removeClass(this.box.el_, 'locked');
  }

  show() {
    this.options.hidden = false;
    if (typeof this.rstb != 'undefined') {
      this.rstb.show();
      if (this.options.controlTime)
        this.showcontrolTime();
    }
  }

  hide() {
    this.options.hidden = true;
    if (typeof this.rstb != 'undefined') {
      this.rstb.hide();
      // this.ctp.hide();
    }
  }

  showPanel() {
    this.options.panel = true;
    if (typeof this.tp != 'undefined')
      _vjs4.removeClass(this.tp.el_, 'disable');
  }

  hidePanel() {
    this.options.panel = false;
    if (typeof this.tp != 'undefined')
      _vjs4.addClass(this.tp.el_, 'disable');
  }

  showcontrolTime() {
    this.options.controlTime = true;
    if (typeof this.ctp != 'undefined')
      this.ctp.show();
  }

  hidecontrolTime() {
    this.options.controlTime = false;
    if (typeof this.ctp != 'undefined')
      this.ctp.hide();
  }

  setValue(index, seconds, writeControlTime) {
    // console.log("set value")
    //index = 0 for the left Arrow and 1 for the right Arrow. Value in seconds
    writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;

    var percent = this._percent(seconds);
    var isValidIndex = (index === 0 || index === 1);
    var isChangeable = !this.locked;
    if (isChangeable && isValidIndex)
      this.box.setPosition(index, percent, writeControlTime);
  }

  setValues(start, end, writeControlTime) {
    //index = 0 for the left Arrow and 1 for the right Arrow. Value in seconds
    writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;

    this._reset();

    this._setValuesLocked(start, end, writeControlTime);
  }

  getValues() { //get values in seconds
    var values = {}, start, end;
    start = this.start || this._getArrowValue(0);
    end = this.end || this._getArrowValue(1);
    return {start: start, end: end};
  }

  playBetween(start, end, showRS) {
    showRS = typeof showRS == 'undefined' ? true : showRS;
    this.player.currentTime(start);
    this.player.play();
    if (showRS) {
      this.show();
      this._reset();
    } else {
      this.hide();
    }
    this._setValuesLocked(start, end);

    this.bar.activatePlay(start, end);
  }

  loop(start, end, show) {
    var player = this.player;

    if (player) {
      player.on("pause", videojs.bind(this, function () {
        this.looping = false;
      }));

      show = typeof show === 'undefined' ? true : show;

      if (show) {
        this.show();
        this._reset();
      }
      else {
        this.hide();
      }
      this._setValuesLocked(start, end);

      this.timeStart = start;
      this.timeEnd = end;
      this.looping = true;

      this.player.currentTime(start);
      this.player.play();

      this.player.on("timeupdate", videojs.bind(this, this.bar.process_loop));
    }
  }

  _getArrowValue(index) {
    index = index || 0;
    var duration = this.player.duration();

    duration = typeof duration == 'undefined' ? 0 : duration;

    var percentage = this[index === 0 ? "left" : "right"].el_.style.left.replace("%", "");
    if (percentage === "")
      percentage = index === 0 ? 0 : 100;

    return _vjs4.round(this._seconds(percentage / 100), this.updatePrecision - 1);
  }

  _percent(seconds) {
    var duration = this.player.duration();
    if (isNaN(duration)) {
      return 0;
    }
    return Math.min(1, Math.max(0, seconds / duration));
  }

  _seconds(percent) {
    var duration = this.player.duration();
    if (isNaN(duration)) {
      return 0;
    }
    return Math.min(duration, Math.max(0, percent * duration));
  }

  _reset() {
    var duration = this.player.duration();
    this.tpl.el_.style.left = '0%';
    this.tpr.el_.style.left = '100%';
    this._setValuesLocked(0, duration);
  }

  _setValuesLocked(start, end, writeControlTime) {
    var triggerSliderChange = typeof writeControlTime != 'undefined';
    writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;
    if (this.options.locked) {
      this.unlock();//It is unlocked to change the bar position. In the end it will return the value.
      this.setValue(0, start, writeControlTime);
      this.setValue(1, end, writeControlTime);
      this.lock();
    } else {
      this.setValue(0, start, writeControlTime);
      this.setValue(1, end, writeControlTime);
    }

    // Trigger slider change
    if (triggerSliderChange) {
      this._triggerSliderChange();
    }
  }

  _checkControlTime(index, TextInput, timeOld) {
    var h = TextInput[0],
      m = TextInput[1],
      s = TextInput[2],
      newHour = h.value,
      newMin = m.value,
      newSec = s.value,
      obj, objNew, objOld;
    index = index || 0;

    if (newHour != timeOld[0]) {
      obj = h;
      objNew = newHour;
      objOld = timeOld[0];
    } else if (newMin != timeOld[1]) {
      obj = m;
      objNew = newMin;
      objOld = timeOld[1];
    } else if (newSec != timeOld[2]) {
      obj = s;
      objNew = newSec;
      objOld = timeOld[2];
    } else {
      return false;
    }

    var duration = this.player.duration() || 0,
      durationSel;

    var intRegex = /^\d+$/;//check if the objNew is an integer
    if (!intRegex.test(objNew) || objNew > 60) {
      objNew = objNew === "" ? "" : objOld;
    }

    newHour = newHour === "" ? 0 : newHour;
    newMin = newMin === "" ? 0 : newMin;
    newSec = newSec === "" ? 0 : newSec;

    durationSel = videojs.TextTrack.prototype.parseCueTime(newHour + ":" + newMin + ":" + newSec);
    if (durationSel > duration) {
      obj.value = objOld;
      obj.style.border = "1px solid red";
    } else {
      obj.value = objNew;
      h.style.border = m.style.border = s.style.border = "1px solid transparent";
      this.setValue(index, durationSel, false);

      // Trigger slider change
      this._triggerSliderChange();
    }
    // if (index === 1) {
    //     var oldTimeLeft = this.ctpl.el_.children,
    //             durationSelLeft = videojs.TextTrack.prototype.parseCueTime(oldTimeLeft[0].value + ":" + oldTimeLeft[1].value + ":" + oldTimeLeft[2].value);
    //     if (durationSel < durationSelLeft) {
    //         obj.style.border = "1px solid red";
    //     }
    // } else {

    //     var oldTimeRight = this.ctpr.el_.children,
    //             durationSelRight = videojs.TextTrack.prototype.parseCueTime(oldTimeRight[0].value + ":" + oldTimeRight[1].value + ":" + oldTimeRight[2].value);
    //     if (durationSel > durationSelRight) {
    //         obj.style.border = "1px solid red";
    //     }
    // }
  }

  _triggerSliderChange() {
    this.player.trigger("sliderchange");
  }
}

(function () {

  Component.registerComponent('SelectionBar', SelectionBar);
  Component.registerComponent('SelectionBarLeft', SelectionBarLeft);
  Component.registerComponent('SelectionBarRight', SelectionBarRight);
  Component.registerComponent('SeekRSBar', SeekRSBar);
  Component.registerComponent('RSTimeBar', RSTimeBar);
  Component.registerComponent('TimePanel', TimePanel);
  Component.registerComponent('TimePanelLeft', TimePanelLeft);
  Component.registerComponent('TimePanelRight', TimePanelRight);
  Component.registerComponent('ControlTimePanel', ControlTimePanel);
  Component.registerComponent('ControlTimePanelLeft', ControlTimePanelLeft);
  Component.registerComponent('ControlTimePanelRight', ControlTimePanelRight);
  //----------------Create new Plugin----------------//
  videojs.registerPlugin('rangeSlider', rangeSlider_);

  //--Charge the new Component into videojs
  var videojsSeekBar = Component.getComponent('SeekBar');
  videojsSeekBar.prototype.options_.children.push('RSTimeBar'); //Range Slider Time Bar

  var videojsControlBar = Component.getComponent('ControlBar');
  videojsControlBar.prototype.options_.children.push('ControlTimePanel'); //Panel with the time of the range slider

  //----------------Public Functions----------------//

  //-- Public Functions added to video-js

  var videojsPlayer = Component.getComponent('Player');
  // videojsPlayer.prototype.options_.children.push('rangeSlider_'); //Range Slider Time Bar

  //Lock the Slider bar and it will not be possible to change the arrow positions
  videojsPlayer.prototype.lockSlider = function() {
    return this.rangeslider.lock();
  };

  //Unlock the Slider bar and it will be possible to change the arrow positions
  videojsPlayer.prototype.unlockSlider = function() {
    return this.rangeslider.unlock();
  };

  //Show the Slider Bar Component
  videojsPlayer.prototype.showSlider = function() {
    return this.rangeslider.show();
  };

  //Hide the Slider Bar Component
  videojsPlayer.prototype.hideSlider = function() {
    return this.rangeslider.hide();
  };

  //Show the Panel with the seconds of the selection
  videojsPlayer.prototype.showSliderPanel = function() {
    return this.rangeslider.showPanel();
  };

  //Hide the Panel with the seconds of the selection
  videojsPlayer.prototype.hideSliderPanel = function() {
    return this.rangeslider.hidePanel();
  };


  //Show the control Time to edit the position of the arrows
  videojsPlayer.prototype.showControlTime = function() {
    return this.rangeslider.showcontrolTime();
  };

  //Hide the control Time to edit the position of the arrows
  videojsPlayer.prototype.hideControlTime = function() {
    return this.rangeslider.hidecontrolTime();
  };

  //Set a Value in second for both arrows
  videojsPlayer.prototype.setValueSlider = function(start, end) {
    return this.rangeslider.setValues(start, end);
  };

  //The video will be played in a selected section
  videojsPlayer.prototype.playBetween = function(start, end) {
    return this.rangeslider.playBetween(start, end);
  };

  //The video will loop between to values
  videojsPlayer.prototype.loopBetween = function(start, end) {
    return this.rangeslider.loop(start, end);
  };

  //Set a Value in second for the arrows
  videojsPlayer.prototype.getValueSlider = function() {
    return this.rangeslider.getValues();
  };
})();

export default rangeSlider_;
