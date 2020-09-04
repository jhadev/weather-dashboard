export function toggleTempColor(temp) {
  let color = '';
  if (temp >= 90) {
    color = 'red';
  } else if (temp < 90 && temp >= 75) {
    color = 'orange';
  } else if (temp < 75 && temp >= 55) {
    color = 'teal';
  } else if (temp < 55 && temp >= 33) {
    color = 'cyan';
  } else {
    color = 'blue';
  }

  return color;
}
