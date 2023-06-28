import yaml from "js-yaml";

const get_next_states = (state, black_list = []) => {
    const result = [];
    // if (state?.)
    if (state?.transitions?.next) {
        result.push(state.transitions.next);
    }
    if (state?.transitions?.actions) {
        for (const [key, value] of Object.entries(state.transitions.actions)) {
            result.push(value);
        }
    }
    return result.filter(value => !black_list.includes(value));
}

export const getNodesEdges = (used_states, black_list) => {
    let nodes = Object.keys(used_states).map((key) => {
        return {id: key, label: key, group: 0}
    });

    let edges = Object.keys(used_states).map((key) => {
        const next_state = used_states[key].transitions?.next ?? null;
        const actions = used_states[key].transitions?.actions ?? null;
        let result = [];
        if (next_state) {
            result = [
                {from: key, to: next_state, label: 'next'}
            ]
        }
        if (actions) {
            Object.entries(actions).forEach(([key_1, value_1]) => {
                result.push({from: key, to: value_1, label: key_1})
            });
        }
        return result;
    }).flat();
    return {nodes, edges}
};


export const getFilteredStates = (INIT_STATE, ALL_STATES, blacklist) => {
    console.log("Debug 3 ");
    const used_states = {};
    const all_states = ALL_STATES;
    let current_state = INIT_STATE;
    used_states[current_state] = all_states[current_state];
    let index = 1;

    while (index <= Object.keys(used_states).length) {
        if (current_state !== "resetFlow") {
            const next_states = get_next_states(all_states[current_state], blacklist);
            next_states.forEach(el => {
                if (!used_states.hasOwnProperty(el)) {
                    used_states[el] = all_states[el];
                }
            });
            current_state = Object.keys(used_states)[index];
        }
        index++;
    }
    return used_states;
};

export function convertYamlToJson(yamlString) {
    try {
        return yaml.load(yamlString);
    } catch (error) {
        console.error('Error converting YAML to JSON:', error);
        return null;
    }
}
