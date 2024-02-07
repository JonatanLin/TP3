export function convertTimestamp(timestamp) {
    let annee = timestamp.getFullYear();
    let mois = timestamp.getMonth() + 1;
    let jour = timestamp.getDate();
    let heure = timestamp.getHours();
    let minute = timestamp.getMinutes();

    return `${annee}${mois<10?"0"+mois:mois}${jour<10?"0"+jour:jour}-${heure<10?"0"+heure:heure}:${minute<10?"0"+minute:minute}`;
}