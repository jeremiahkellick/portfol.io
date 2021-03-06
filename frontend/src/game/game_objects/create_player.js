import GameObject from './game_object';
import Transform from '../game_components/transform';
import TransformSyncronizer from '../transform_syncronizer';
import Syncronizer from '../syncronizer';
import PlayerRenderer from '../renderers/player_renderer';
import HitpointRenderer from '../renderers/hitpoint_renderer';
import MedCountRenderer from '../renderers/med_count_renderer';
import CountdownRenderer from '../renderers/countdown_renderer';
import AmmoClipRenderer from '../renderers/ammo_clip_renderer';
import Vector from '../vector';
import Input from '../game_components/input';
import Movement from '../game_components/movement';
import Camera from '../game_components/camera';
import Shoot from '../game_components/shoot';
import Ammo from '../game_components/ammo';
import Collider from '../game_components/collider';
import Pickup from '../game_components/pickup';
import Hitpoint from '../game_components/hitpoint';
import Speed from '../game_components/speed';
import Inventory from '../game_components/inventory';
import Circle from '../shapes/circle';
import NameRenderer from '../renderers/name_renderer';
import GameOver from '../game_components/game_over';
import Teleport from '../game_components/teleport';
import Count from '../game_components/count';
import VictoryChecker from '../game_components/victory_checker';
import Game from '../game';
import KillCounter from '../game_components/kill_counter';

const createPlayer = ({ id, owned, position, health, name }) => {
  const radius = 22;
  const player = new GameObject(id);
  const transform = new Transform(Vector.fromPOJO(position));
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  const hitpoint = new Hitpoint(health);
  player.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  player.addComponent(new PlayerRenderer(radius, 2));
  player.addComponent(new Movement());
  player.addComponent(new Collider(new Circle(radius), 1, 'player'));
  player.addComponent(new Count('players'));

  if (owned) {
    player.addComponent(new Input());
    player.addComponent(new Ammo(30));
    player.addComponent(new Shoot());
    player.addComponent(new Teleport());
    player.addComponent(new Pickup());
    const inventory = new Inventory();
    player.addComponent(inventory);
    player.addComponent(new Speed());
    player.addComponent(new Camera());
    player.addComponent(new HitpointRenderer(10));
    player.addComponent(new MedCountRenderer(10));
    player.addComponent(new AmmoClipRenderer(10));
    player.addComponent(new CountdownRenderer(10));
    player.addComponent(new GameOver());
    player.addComponent(new VictoryChecker());

    const createMedKit = (transform, inventory) => {
      return () => {
        let options;
        for (let i = 0; i < inventory.inventory['medKit']; i ++ ) {
          options = {
            type: 'medKit',
            position: transform.position.plus(Vector.random(50,50)).toPOJO()
          };
          Game.game.sendCreateToServer(options);
        }
      }
    };
    hitpoint.onDeathFunctions.push( createMedKit(transform, inventory) );
  } else {
    player.addComponent(new KillCounter());
    player.addComponent(new NameRenderer(name, 3));
  }

  return player;
};

export default createPlayer;
