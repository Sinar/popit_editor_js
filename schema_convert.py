import json
import argparse

# Drop 
def converter(src_path, dest_path):
    src_schema = json.load(open(src_path))

    dest_schema = {}

    required = []

    src_properties = src_schema["properties"]

    for key in src_schema:
        if key == "properties":
            continue

        if key == "$schema":
            continue

        dest_schema[key] = src_schema[key]
        dest_schema["properties"], required = convert_properties(src_properties)
        dest_schema["required"] = required

    json.dump(dest_schema, open(dest_path, "w"), sort_keys=True, indent=2, separators=(',', ': '))

def convert_properties(src_prop):
    dest_prop = {}
    required = []

    for key in src_prop:
        temp = {}
        # Figure out how to handle this
        if "type" in src_prop[key]:
            if src_prop[key]["type"] == "array":
                continue

            if 'string' in src_prop[key]["type"]:
                temp["type"] = 'string'
                temp["title"] = src_prop[key]["description"]
                temp["attrs"] = {
                    "placeholder": src_prop[key]["description"],
                    "title": src_prop[key]["description"]
                }
                if "pattern" in src_prop[key]:
                    temp["pattern"] = src_prop[key]["pattern"]
                if "format" in src_prop[key]:
                    temp["format"] = src_prop[key]["format"]
             
                dest_prop[key] = temp

                if 'null' not in src_prop[key]["type"]:
                    required.append(key)


    return dest_prop, required

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert json schema to an updated one")

    parser.add_argument('source')
    parser.add_argument('destination')
    args = parser.parse_args()
    print(args.destination)
    print(args.source)
    converter(args.source, args.destination) 
