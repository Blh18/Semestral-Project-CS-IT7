import Vertex from './vertex';

/**
 * Edges represent a relation between two vertices.
 */
class EdgeCost {
  /**
   * Combine costs of multiple edges into one
   * @param ecs EdgeCost[] costs to be combined
   * @return EdgeCost Combined cost of all ecs
   */

  static combine(...ecs: EdgeCost[]): EdgeCost {
    const res = new EdgeCost();
    for (const ec of ecs) {
      res.distance += ec.distance;
      res.time += ec.time;
      res.road_cost += ec.distance * ec.road_cost;
    }

    res.road_cost /= res.distance;

    return res;
  }

  // Real distance between two vertices in meters
  distance: number;
  // Real time between two vertices in minutes
  time: number;
  // Type of road between two vertices as a float value
  road_cost: number;

  /**
   * Constructor for the EdgeCost object which gives every edge between vertices a weight value for further calculation
   * @param v1: Vertex - vertex object which forms the edge with the second one
   * @param v2: Vertex - vertex which forms the edge with the first one
   * @param road_type: string - type of road which connects the two vertices
   */
  constructor(v1: Vertex = null, v2: Vertex = null, road_type: string = null) {
    if (v1 == null) {
      return;
    }

    const lngSq = Math.pow((v1.lng - v2.lng), 2);
    const latSq = Math.pow((v1.lat - v2.lat), 2);
    this.distance = Math.sqrt(latSq + lngSq);
    this.setRoadCost(road_type);
  }

  /**
   * Method which determines the cost value depending on the road type between vertices
   * @param road_type: string - Type of road
   */
  private setRoadCost(road_type: string = null) {
    let max_speed: number;

    switch (road_type) {
      case 'motorway':
        this.road_cost = 1;
        max_speed = 100;
        break;
      case 'trunk':
        this.road_cost = 2;
        max_speed = 80;
        break;
      case 'primary':
        this.road_cost = 3;
        max_speed = 70;
        break;
      case 'motorway_link':
        this.road_cost = 4;
        max_speed = 60;
        break;
      case 'secondary':
        this.road_cost = 5;
        max_speed = 60;
        break;
      case 'tertiary':
        this.road_cost = 6;
        max_speed = 50;
        break;
      case 'unclassified':
        this.road_cost = 7;
        max_speed = 50;
        break;
      case 'trunk_link':
        this.road_cost = 8;
        max_speed = 40;
        break;
      case 'primary_link':
        this.road_cost = 9;
        max_speed = 30;
        break;
      case 'secondary_link':
        this.road_cost = 10;
        max_speed = 30;
        break;
      case 'tertiary_link':
        this.road_cost = 11;
        max_speed = 30;
        break;
      case 'residential':
        this.road_cost = 12;
        max_speed = 30;
        break;
      case 'service':
        this.road_cost = 13;
        max_speed = 15;
        break;
      case 'living_street':
        this.road_cost = 14;
        max_speed = 15;
        break;
      default:
        this.road_cost = 7;
        max_speed = 50;
        break;
    }
    this.time = this.distance / (max_speed / 60);
  }
}

export default EdgeCost;
