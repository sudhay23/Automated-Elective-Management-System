export default async function freezeRoundOne(coursePrefs, studentObj) {
    const prefsIds = coursePrefs.map((course) => course._id);
    console.log(prefsIds, studentObj);
}
