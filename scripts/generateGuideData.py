import json
import re

FILE_PATH = 'chap1.txt' # change for a http req to the original guide
WRITE_FILE_PATH = '../src/assets/data/guideData.json'

TITLE_PATTERN = r"1\.\d+: [\w|\s].+" #regex for titles. ex: 1.1: Tutorial island up to and including Wintertodt
STEP_REMOVE_PATTERN = r'(GP stack: .+)|(Skills/quests met\?: .+)|(Total time: .+)' #regex for steps that are not steps. ex: 'GP stack:', 'Skills/quests met?:'

data_out = {
    "title": "Chapter 1: Get to da chopper earth staves",
    "sections": []
}

with open(FILE_PATH, 'r', encoding='utf8') as file:
    data = file.read().strip()
    # Split the data into titles and sections
    titles = [x.strip() for x in re.findall(TITLE_PATTERN, data)]
    data = re.split(TITLE_PATTERN, data)
    # Append all non-empty strings to the list
    sections = [x.strip() for x in data if x]

    for i in range(len(titles)):
        data_out['sections'].append({
            "subtitle": titles[i],
            "steps": [x for x in sections[i].split('\n') if x and not re.match(STEP_REMOVE_PATTERN, x)]
        })

with open(WRITE_FILE_PATH, 'w') as file:
    file.write(json.dumps(data_out, indent=2))