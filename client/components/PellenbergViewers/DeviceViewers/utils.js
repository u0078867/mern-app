
export function getFormKeyFromDeviceFunction(func) {
  switch (func) {
    case 'opto_cluster':
      return 'insert-update-opto-cluster'
    case 'opto_system':
      return 'insert-update-opto-system'
    case 'opto_marker':
      return 'insert-update-opto-marker'
    case 'computer':
      return 'insert-update-computer'
    case 'us_probe':
      return 'insert-update-us-probe'
    case 'us_beamformer':
      return 'insert-update-us-beamformer'
    case 'us_probe_skin_interface':
      return 'insert-update-us-portico'
    case 'us_probe_holder':
      return 'insert-update-us-probe-holder'
    case 'signal_converter':
      return 'insert-update-signal-converter'
    default:
      return 'insert-update-signal-converter'
  }
}
