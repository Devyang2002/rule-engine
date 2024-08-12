import json
import random

# Predefined list of camper-related devices
device_names = [
    "Fridge", "Water", "Heater", "Fresh water", "Used water", 
    "Battery pack 1", "Battery pack 2", "Front light", "Rear light", 
    "Awning light", "Interior light", "Air Conditioner", "Solar Panel", 
    "Generator", "Inverter", "Pump", "Fan", "Cooktop", "Microwave", "Television"
]

# Types of capabilities
capability_types = {
    "temperature": 2,
    "switch": 1,
    "level": 2,
    "battery": 1,
    "ambiente": 1
}

def generate_mac():
    return ":".join(["{:02X}".format(random.randint(0, 255)) for _ in range(6)])

def generate_capabilities(cap_type):
    count = capability_types[cap_type]
    if isinstance(count, list):
        count = random.choice(count)
    capabilities = []
    for i in range(count):
        capability = {
            "index": i,
            "type": cap_type,
            "name": random.choice(device_names),
            "icon": "default_node.png"
        }
        if cap_type == "battery":
            capability["channel_count"] = random.randint(1, 5) 
        capabilities.append(capability)
    return capabilities

def generate_nodes():
    nodes = []
    num_nodes = random.randint(6, 25)
    for _ in range(num_nodes):
        cap_type = random.choice(list(capability_types.keys()))
        nodes.append({
            "mac": generate_mac(),
            "capabilities": generate_capabilities(cap_type)
        })
    return nodes

def generate_systems(num_systems):
    systems = []
    for _ in range(num_systems):
        system = {
            "system": {
                "brain": {
                    "mac": generate_mac(),
                    "nodes": generate_nodes()
                }
            }
        }
        systems.append(system)
    return systems

def main(num_systems, filename):
    systems = generate_systems(num_systems)
    with open(filename, 'w') as file:
        json.dump(systems, file, indent=2)
    print(f"Data saved to {filename}")

if __name__ == "__main__":
    num_systems = int(input("Enter the number of systems to generate: "))
    filename = input("Enter the filename to save the data: ")
    main(num_systems, filename)