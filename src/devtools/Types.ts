/// <reference path="../chrome/DebuggerWebAudioDomain.ts" />

import {Protocol} from 'devtools-protocol/types/protocol';
import {
  PageDebuggerEvent,
  PageDebuggerEventParams,
} from '../chrome/DebuggerPageDomain';

import {
  WebAudioDebuggerEvent,
  WebAudioDebuggerEventParams,
} from '../chrome/DebuggerWebAudioDomain';

import {Utils} from '../utils/Types';

/** @namespace Audion */

/**
 * @typedef Audion.WebAudioEvent
 * @property {Method} method
 * @property {Params} params
 */

export namespace Audion {
  export type ContextRealtimeData = Protocol.WebAudio.ContextRealtimeData;

  export enum GraphEdgeType {
    NODE = 'node',
    PARAM = 'param',
  }

  export interface GraphNodeEdge {
    sourceOutputIndex: number;
    destinationType: GraphEdgeType.NODE;
    destinationInputIndex: number;
  }

  export interface GraphParamEdge {
    sourceOutputIndex: number;
    destinationType: GraphEdgeType.PARAM;
    destinationParamId: string;
    destinationParamIndex: number;
  }

  export type GraphEdge = GraphNodeEdge | GraphParamEdge;

  export interface GraphlibEdge<V = GraphEdge> {
    v: string;
    w: string;
    name: string;
    value: V;
  }

  export interface GraphContext {
    id: Protocol.WebAudio.GraphObjectId;
    eventCount: number;
    context: Protocol.WebAudio.BaseAudioContext;
    realtimeData: ContextRealtimeData;
    nodes: {[key: string]: GraphNode};
    params: {[key: string]: Protocol.WebAudio.AudioParam};
    graph: any;
  }

  export interface GraphContextMessage {
    graphContext: Audion.GraphContext;
  }

  export interface GraphContextsById {
    [key: string]: Audion.GraphContext;
  }

  export interface AllGraphsMessage {
    allGraphs: GraphContextsById;
  }

  export type DevtoolsMessage = GraphContextMessage | AllGraphsMessage;

  export enum DevtoolsRequestType {
    COLLECT_GARBAGE = 'collectGarbage',
  }

  export interface DevtoolsCollectGarbageRequest {
    type: DevtoolsRequestType.COLLECT_GARBAGE;
  }

  export type DevtoolsRequest = DevtoolsCollectGarbageRequest;

  export interface DevtoolsObserver extends Utils.Observer<DevtoolsMessage> {}

  export interface GraphNode {
    node: Protocol.WebAudio.AudioNode;
    params: Protocol.WebAudio.AudioParam[];
    edges: Protocol.WebAudio.NodesConnectedEvent[];
  }

  export type PageEvent<N extends PageDebuggerEvent = PageDebuggerEvent> = {
    method: N;
    params: PageDebuggerEventParams<N>[0];
  };

  export type WebAudioEvent<
    N extends WebAudioDebuggerEvent = WebAudioDebuggerEvent,
  > = {
    method: N;
    params: WebAudioDebuggerEventParams<N>[0];
  };
}

/**
 * @typedef Audion.GraphContext
 * @property {ChromeDebuggerWebAudioDomain.GraphObjectId} id
 * @property {ChromeDebuggerWebAudioDomain.BaseAudioContext} context
 * @property {Object<string, Audion.GraphNode>} nodes
 * @property {Object<string, ChromeDebuggerWebAudioDomain.AudioParam>} params
 * @property {object} graph
 */

/**
 * @typedef Audion.GraphContextMessage
 * @property {Audion.GraphContext} graphContext
 */

/**
 * @typedef Audion.AllGraphsMessage
 * @property {Object<string, Audion.GraphContext>} allGraphs
 */

/**
 * @typedef {Audion.GraphContextMessage
 *   | Audion.AllGraphsMessage
 *   } Audion.DevtoolsMessage
 */

/**
 * @typedef {Utils.Observer<Audion.DevtoolsMessage>} Audion.DevtoolsObserver
 */
