// Array through which we'll communicate with PICO-8.
var pico8_buttons = [0];
// Start polling gamepads.
requestAnimationFrame(updateGamepads);

// Workhorse function, updates pico8_buttons once per frame.
function updateGamepads() {
  var bitmask = 0;
  
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  // Gather input from all known gamepads.
  // All gamepads are mapped to player #1, for now.
  for (var i = 0; i < gamepads.length; i++) {
  	var gp = gamepads[i];
  	if (!gp || !gp.connected) continue;

    // directions (from axes or d-pad "buttons")
  	bitmask |= (axis(gp,0) < -0.5 || btn(gp,14)) ? 1 : 0;
  	bitmask |= (axis(gp,0) > 0.5 || btn(gp,15))  ? 2 : 0;
  	bitmask |= (axis(gp,1) < -0.5 || btn(gp,12)) ? 4 : 0;
  	bitmask |= (axis(gp,1) > 0.5 || btn(gp,13))  ? 8 : 0;
    // buttons (mapped twice for user convenience)
  	bitmask |= (btn(gp,0) || btn(gp,2)) ? 16 : 0;
  	bitmask |= (btn(gp,1) || btn(gp,3)) ? 32 : 0;
  }

  // Update actual array and restart next frame.
	pico8_buttons[0] = bitmask;  
	requestAnimationFrame(updateGamepads);
}

// Helpers for accessing gamepad
function axis(gp,n) { return gp.axes[n] || 0.0; }
function btn(gp,b) { return gp.buttons[b] ? gp.buttons[b].pressed : false; }
