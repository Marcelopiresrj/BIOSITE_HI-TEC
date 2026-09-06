export function getStoreStatus() {
  const now = new Date();
  
  // Use explicit timezone conversion to Brazil time
  const targetTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
  const day = targetTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = targetTime.getHours();
  const minutes = targetTime.getMinutes();
  const timeNum = hours * 100 + minutes; // e.g., 9:30 => 930, 18:30 => 1830

  let isOpen = false;

  // Monday to Friday: 09:00 to 18:30
  if (day >= 1 && day <= 5) {
    if (timeNum >= 900 && timeNum < 1830) {
      isOpen = true;
    }
  } 
  // Saturday: 09:00 to 14:30
  else if (day === 6) {
    if (timeNum >= 900 && timeNum < 1430) {
      isOpen = true;
    }
  }
  // Sunday (0) is closed by default

  if (isOpen) {
    return {
      isOpen: true,
      text: 'Loja Aberta / Atendimento Online',
      textColor: 'text-emerald-400',
      dotColor: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
      borderColor: 'hover:border-emerald-500/40'
    };
  } else {
    return {
      isOpen: false,
      text: 'Loja Fechada Agora',
      textColor: 'text-rose-400',
      dotColor: 'bg-rose-500 shadow-[0_0_8px_#f43f5e]',
      borderColor: 'hover:border-rose-500/40'
    };
  }
}
