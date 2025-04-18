//The name and code suggests this file does the spreadsheet/server stuff

import { keys, lastGet, matches, response, teams } from "$lib/store";
import type {
  Team,
  Alliance,
  Match,
  Response,
  Input
} from "$lib/types";
import { get as getStore } from "svelte/store";
import { PUBLIC_API_URL } from "$env/static/public";

//gets data from spreadsheet
export const get = async () => {
  try {
    const response = await fetch(PUBLIC_API_URL);
    const {
      matches: match_array,
      teams: team_array
    }: Record<string, any[][]> = await response.json();
    setMatches(match_array);
    setTeams(team_array as [number, string][]);
    lastGet.set(Date.now());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

//Formats app data so it can be sent to the spreadsheet
export const append = async (responseQueue: Response[]) => {
  const body = JSON.stringify(responseQueue.map((response) => ({
    team: response.team,
    match: response.match,
    scout: response.scout,
    alliance: response.alliance,
    type: response.type.name,
    id: response.id,
    ...response.data
  })));

  console.log(body);

  try {
    await fetch(PUBLIC_API_URL, {
      method: "POST",
      body,
      // body: JSON.stringify(
      //   responseQueue.map((response) => [
      //     response.team,
      //     response.match,
      //     response.scout,
      //     response.alliance,
      //     response.type.name,
      //     response.id,
      //     ...Object.keys(response.data).map((key: string) => response.data[key]),
      //   ])
      // ),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });
    return true;
  } catch {
    return false;
  }
};

//this is where the form gets set
//shouldn't need it this year but i'm leaving it just in case
// const setForm = (
//   sections: string[][],
//   config: string[][],
//   options: string[][],
//   groups: string[][]
// ) => {
//   const ids: string[] = [];
//   const filled_groups: Group[] = [];
//   const empty_groups = groups.map((group) => {
//     const [id, type, label, section] = group;
//     return {
//       id,
//       type,
//       label,
//       section,
//       components: [],
//     } as Group;
//   });
//   transpose(config).forEach((component) => {
//     const [
//       id,
//       type,
//       label,
//       section,
//       default_,
//       max,
//       min,
//       increment,
//       charset,
//       option,
//       group,
//       group_id,
//       group_type,
//     ] = component;
//     ids.push(id);
//     if (group == "grid") {
//       let toAdd: Grid;
//       const emptyIndex = empty_groups.findIndex(
//         (group) => group.type == "grid" && group_id === group.id
//       );
//       if (emptyIndex != -1) {
//         toAdd = empty_groups[emptyIndex] as Grid;
//         filled_groups.push(toAdd);
//         empty_groups.splice(emptyIndex, 1);
//       } else {
//         toAdd = filled_groups.find(
//           (group) => group.type == "grid" && group_id === group.id
//         ) as Grid;
//       }
//       toAdd.components.push({
//         id,
//         type: group_type.split(" ")[0],
//         position: group_type.split(" ")[1],
//       } as GridSpot);
//     } else if (group == "row") {
//       let toAdd: Row;
//       const emptyIndex = empty_groups.findIndex(
//         (group) => group.type == "row" && group_id === group.id
//       );
//       if (emptyIndex != -1) {
//         toAdd = empty_groups[emptyIndex] as Row;
//         filled_groups.push(toAdd);
//         empty_groups.splice(emptyIndex, 1);
//       } else {
//         toAdd = filled_groups.find(
//           (group) => group.type == "row" && group_id === group.id
//         ) as Row;
//       }
//       toAdd.components.push({
//         label,
//         section,
//         type: "input",
//         component: {
//           id,
//           type,
//           default: parseInt(default_),
//           max: parseInt(max),
//           min: parseInt(min),
//           increment: parseInt(increment),
//           charset,
//           options: options.find((opt) => opt[0] == option)?.slice(1),
//         },
//       } as Input);
//     } else {
//       filled_groups.push({
//         label,
//         section,
//         type: "input",
//         component: {
//           id,
//           type,
//           default: parseInt(default_),
//           max: parseInt(max),
//           min: parseInt(min),
//           increment: parseInt(increment),
//           charset,
//           options: options.find((opt) => opt[0] == option)?.slice(1),
//         },
//       } as Input);
//     }
//   });
//   form.set({
//     sections: sections.map((section) => {
//       const [id, header] = section;
//       return {
//         type: "section",
//         header,
//         id,
//         groups: filled_groups.filter((group) => group.section == id),
//       };
//     }),
//   });
//   keys.set(ids);
// };

const setTeams = (team_array: [number, string][]) => {
  const team_obj: Record<number, Team> = {};
  team_array.forEach(
    (team) =>
      (team_obj[team[0]] = {
        number: team[0],
        name: team[1],
      })
  );
  teams.set(team_obj);
};

const setMatches = (match_array: number[][]) => {
  const match_obj: Record<number, Match> = {};
  match_array.forEach(
    (match, i) =>
      (match_obj[i + 1] = {
        number: i + 1,
        red_alliance: match.slice(0, 3) as Alliance,
        blue_alliance: match.slice(3, 6) as Alliance,
        red_score: match[6],
        blue_score: match[7],
      })
  );
  matches.set(match_obj);
};

//I think this just turns an array of columns into an array of rows
const transpose = <T>(matrix: T[][]) =>
  matrix[0].map((_, i) => matrix.map((array) => array[i]));
