/*** BatteryPolling Z-Way HA module *******************************************

Version: 1.0.0
(c) ZWave.Me, 2013
-----------------------------------------------------------------------------
Author: Gregory Sitnin <sitnin@z-wave.me>
Description:
    This module listens given VirtualDevice (which MUSt be typed as switch)
    level metric update events and switches off device after configured
    timeout if this device has been switched on.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function BatteryPolling (id, controller) {
    // Call superconstructor first (AutomationModule)
    BatteryPolling.super_.call(this, id, controller);
}

inherits(BatteryPolling, AutomationModule);

_module = BatteryPolling;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

BatteryPolling.prototype.init = function (config) {
    // Call superclass' init (this will process config argument and so on)
    BatteryPolling.super_.prototype.init.call(this, config);

    this.controller.emit("cron.addTask", "batteryPolling.poll", {
        minute: 0,
        hour: 0,
        weekDay: this.config.launchWeekDay,
        day: null,
        month: null
    });

    // Setup event listener
    this.controller.on('batteryPolling.poll', function () {
      for (var id in zway.devices) {
       zway.devices[id].Battery && zway.devices[id].Battery.Get();
      }
    });
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

