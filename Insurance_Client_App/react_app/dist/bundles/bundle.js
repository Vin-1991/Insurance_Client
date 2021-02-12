/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "facb0c6a7affb0a9b255";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\Users\\vinayaggarwal\\source\\repos\\Insurance_Client_App\\Insurance_Client_App\\react_app\\dist\\bundles";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./components/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../canvg/index.js":
/*!***************************************!*\
  !*** external "../../canvg/index.js" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"../../canvg/index.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vY2FudmcvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCIuLi8uLi9jYW52Zy9pbmRleC5qc1wiPzMwYWIiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY2FudmcvaW5kZXguanNcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../canvg/index.js\n");

/***/ }),

/***/ "../../pdfmake/vfs_fonts":
/*!******************************************!*\
  !*** external "../../pdfmake/vfs_fonts" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"../../pdfmake/vfs_fonts\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vcGRmbWFrZS92ZnNfZm9udHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCIuLi8uLi9wZGZtYWtlL3Zmc19mb250c1wiPzBhNmQiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vcGRmbWFrZS92ZnNfZm9udHNcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../pdfmake/vfs_fonts\n");

/***/ }),

/***/ "./components/App.js":
/*!***************************!*\
  !*** ./components/App.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ \"./node_modules/@material-ui/core/esm/CssBaseline/index.js\");\n/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/AppBar */ \"./node_modules/@material-ui/core/esm/AppBar/index.js\");\n/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Toolbar */ \"./node_modules/@material-ui/core/esm/Toolbar/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Container */ \"./node_modules/@material-ui/core/esm/Container/index.js\");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/esm/Grid/index.js\");\n/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Home */ \"./node_modules/@material-ui/icons/Home.js\");\n/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ \"./node_modules/@material-ui/icons/AccountCircle.js\");\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/SettingsPower */ \"./node_modules/@material-ui/icons/SettingsPower.js\");\n/* harmony import */ var _material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_SettingsPower__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _components_views_policyDetailsView__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/views/policyDetailsView */ \"./components/views/policyDetailsView.js\");\n/* harmony import */ var _components_views_policyDashboardView__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/views/policyDashboardView */ \"./components/views/policyDashboardView.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n //import '../dist/scss/App.scss';\n\n\n\nconst useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[\"makeStyles\"])(theme => ({\n  root: {\n    display: 'flex'\n  },\n  title: {\n    flexGrow: 1\n  },\n  appBarSpacer: theme.mixins.toolbar,\n  content: {\n    flexGrow: 1,\n    width: '100% !important'\n  }\n}));\n\nconst App = () => {\n  const classes = useStyles();\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes.root\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    position: \"fixed\",\n    className: Object(clsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(classes.appBar, open && classes.appBarShift)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    className: classes.toolbar,\n    variant: \"dense\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"h1\",\n    variant: \"h6\",\n    color: \"inherit\",\n    noWrap: true,\n    className: classes.title\n  }, \"Policy Details\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_12___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"h1\",\n    variant: \"h6\",\n    color: \"inherit\"\n  }, \"Hello, User\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"main\", {\n    className: classes.content\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes.appBarSpacer\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    maxWidth: \"xl\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"BrowserRouter\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    exact: true,\n    path: \"/insurance_client_home\",\n    component: _components_views_policyDetailsView__WEBPACK_IMPORTED_MODULE_14__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    exact: true,\n    path: \"/insurance_client_dashboard\",\n    component: _components_views_policyDashboardView__WEBPACK_IMPORTED_MODULE_15__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Redirect\"], {\n    to: \"/insurance_client_home\"\n  })))))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0FwcC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLmpzP2RkYTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgICBCcm93c2VyUm91dGVyIGFzIFJvdXRlcixcclxuICAgIFJvdXRlLFxyXG4gICAgUmVkaXJlY3QsXHJcbiAgICBTd2l0Y2gsXHJcbn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xyXG5pbXBvcnQgeyBtYWtlU3R5bGVzLCB3aXRoU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcclxuaW1wb3J0IENzc0Jhc2VsaW5lIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0Nzc0Jhc2VsaW5lJztcclxuaW1wb3J0IEFwcEJhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXInO1xyXG5pbXBvcnQgVG9vbGJhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyJztcclxuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeSc7XHJcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0ljb25CdXR0b24nO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0NvbnRhaW5lcic7XHJcbmltcG9ydCBHcmlkIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0dyaWQnO1xyXG5pbXBvcnQgSG9tZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0hvbWUnO1xyXG5pbXBvcnQgQWNjb3VudENpcmNsZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0FjY291bnRDaXJjbGUnO1xyXG5pbXBvcnQgU2V0dGluZ3NQb3dlckljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL1NldHRpbmdzUG93ZXInO1xyXG4vL2ltcG9ydCAnLi4vZGlzdC9zY3NzL0FwcC5zY3NzJztcclxuXHJcbmltcG9ydCBQb2xpY3lEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvdmlld3MvcG9saWN5RGV0YWlsc1ZpZXcnO1xyXG5pbXBvcnQgUG9saWN5RGFzaGJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvdmlld3MvcG9saWN5RGFzaGJvYXJkVmlldyc7XHJcblxyXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKCh0aGVtZSkgPT4gKHtcclxuICAgIHJvb3Q6IHtcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgICBmbGV4R3JvdzogMSxcclxuICAgIH0sXHJcbiAgICBhcHBCYXJTcGFjZXI6IHRoZW1lLm1peGlucy50b29sYmFyLFxyXG4gICAgY29udGVudDoge1xyXG4gICAgICAgIGZsZXhHcm93OiAxLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJSAhaW1wb3J0YW50J1xyXG4gICAgfVxyXG59KSk7XHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yb290fT5cclxuICAgICAgICAgICAgPENzc0Jhc2VsaW5lIC8+XHJcbiAgICAgICAgICAgIDxBcHBCYXIgcG9zaXRpb249XCJmaXhlZFwiIGNsYXNzTmFtZT17Y2xzeChjbGFzc2VzLmFwcEJhciwgb3BlbiAmJiBjbGFzc2VzLmFwcEJhclNoaWZ0KX0+XHJcbiAgICAgICAgICAgICAgICA8VG9vbGJhciBjbGFzc05hbWU9e2NsYXNzZXMudG9vbGJhcn0gdmFyaWFudD1cImRlbnNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgY29tcG9uZW50PVwiaDFcIiB2YXJpYW50PVwiaDZcIiBjb2xvcj1cImluaGVyaXRcIiBub1dyYXAgY2xhc3NOYW1lPXtjbGFzc2VzLnRpdGxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUG9saWN5IERldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFjY291bnRDaXJjbGVJY29uIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgY29tcG9uZW50PVwiaDFcIiB2YXJpYW50PVwiaDZcIiBjb2xvcj1cImluaGVyaXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgSGVsbG8sIFVzZXJcclxuICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgICAgICA8L1Rvb2xiYXI+XHJcbiAgICAgICAgICAgIDwvQXBwQmFyPlxyXG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9e2NsYXNzZXMuY29udGVudH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5hcHBCYXJTcGFjZXJ9IC8+XHJcbiAgICAgICAgICAgICAgICA8Q29udGFpbmVyIG1heFdpZHRoPVwieGxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8R3JpZCBjb250YWluZXIgc3BhY2luZz17Mn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL2luc3VyYW5jZV9jbGllbnRfaG9tZVwiIGNvbXBvbmVudD17UG9saWN5RGV0YWlsc30gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9pbnN1cmFuY2VfY2xpZW50X2Rhc2hib2FyZFwiIGNvbXBvbmVudD17UG9saWN5RGFzaGJvYXJkfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWRpcmVjdCB0bz1cIi9pbnN1cmFuY2VfY2xpZW50X2hvbWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Td2l0Y2g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUm91dGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L21haW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQVJBO0FBQ0E7QUFhQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQVFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/App.js\n");

/***/ }),

/***/ "./components/charts/barchart.js":
/*!***************************************!*\
  !*** ./components/charts/barchart.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BarChart; });\n/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amcharts/amcharts4/core */ \"./node_modules/@amcharts/amcharts4/core.js\");\n/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ \"./node_modules/@amcharts/amcharts4/charts.js\");\n/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ \"./node_modules/@amcharts/amcharts4/themes/animated.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction BarChart({\n  chartData\n}) {\n  _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[\"useTheme\"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n  const createBarChart = () => {\n    // Create chart instance\n    let chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[\"create\"](\"barChartdiv\", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[\"XYChart\"]);\n    chart.scrollbarX = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_0__[\"Scrollbar\"](); // Add data\n\n    chart.data = chartData; // Create axes\n\n    let categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[\"CategoryAxis\"]());\n    categoryAxis.dataFields.category = \"UNIQUE_MONTH\";\n    categoryAxis.renderer.grid.template.location = 0;\n    categoryAxis.renderer.minGridDistance = 30;\n    categoryAxis.renderer.labels.template.horizontalCenter = \"right\";\n    categoryAxis.renderer.labels.template.verticalCenter = \"middle\";\n    categoryAxis.tooltip.disabled = true;\n    categoryAxis.renderer.minHeight = 110;\n    let valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[\"ValueAxis\"]());\n    valueAxis.renderer.minWidth = 50; // Create series\n\n    let series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[\"ColumnSeries\"]());\n    series.sequencedInterpolation = false;\n    series.dataFields.valueY = \"NO_OF_POLICIES_BOUGHT\";\n    series.dataFields.categoryX = \"UNIQUE_MONTH\";\n    series.tooltipText = \"{CUSTOMER_REGION} : {valueY}[/]\";\n    series.columns.template.strokeWidth = 0;\n    series.tooltip.pointerOrientation = \"vertical\";\n    series.columns.template.column.cornerRadiusTopLeft = 10;\n    series.columns.template.column.cornerRadiusTopRight = 10;\n    series.columns.template.column.fillOpacity = 0.8; // on hover, make corner radiuses bigger\n\n    let hoverState = series.columns.template.column.states.create(\"hover\");\n    hoverState.properties.cornerRadiusTopLeft = 0;\n    hoverState.properties.cornerRadiusTopRight = 0;\n    hoverState.properties.fillOpacity = 1;\n    series.columns.template.adapter.add(\"fill\", (fill, target) => {\n      return chart.colors.getIndex(target.dataItem.index);\n    }); // Cursor\n\n    chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_1__[\"XYCursor\"]();\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(() => {\n    createBarChart();\n  }, [chartData]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"barChartdiv\",\n    style: {\n      width: \"100%\",\n      height: \"85vh\"\n    }\n  }));\n}\n;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NoYXJ0cy9iYXJjaGFydC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NvbXBvbmVudHMvY2hhcnRzL2JhcmNoYXJ0LmpzPzU1YjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYW00Y29yZSBmcm9tIFwiQGFtY2hhcnRzL2FtY2hhcnRzNC9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGFtNGNoYXJ0cyBmcm9tIFwiQGFtY2hhcnRzL2FtY2hhcnRzNC9jaGFydHNcIjtcclxuaW1wb3J0IGFtNHRoZW1lc19hbmltYXRlZCBmcm9tIFwiQGFtY2hhcnRzL2FtY2hhcnRzNC90aGVtZXMvYW5pbWF0ZWRcIjtcclxuaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJhckNoYXJ0KHsgY2hhcnREYXRhIH0pIHtcclxuXHJcbiAgICBhbTRjb3JlLnVzZVRoZW1lKGFtNHRoZW1lc19hbmltYXRlZCk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlQmFyQ2hhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGNoYXJ0IGluc3RhbmNlXHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gYW00Y29yZS5jcmVhdGUoXCJiYXJDaGFydGRpdlwiLCBhbTRjaGFydHMuWFlDaGFydCk7XHJcbiAgICAgICAgY2hhcnQuc2Nyb2xsYmFyWCA9IG5ldyBhbTRjb3JlLlNjcm9sbGJhcigpO1xyXG5cclxuICAgICAgICAvLyBBZGQgZGF0YVxyXG4gICAgICAgIGNoYXJ0LmRhdGEgPSBjaGFydERhdGE7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBheGVzXHJcbiAgICAgICAgbGV0IGNhdGVnb3J5QXhpcyA9IGNoYXJ0LnhBeGVzLnB1c2gobmV3IGFtNGNoYXJ0cy5DYXRlZ29yeUF4aXMoKSk7XHJcbiAgICAgICAgY2F0ZWdvcnlBeGlzLmRhdGFGaWVsZHMuY2F0ZWdvcnkgPSBcIlVOSVFVRV9NT05USFwiO1xyXG4gICAgICAgIGNhdGVnb3J5QXhpcy5yZW5kZXJlci5ncmlkLnRlbXBsYXRlLmxvY2F0aW9uID0gMDtcclxuICAgICAgICBjYXRlZ29yeUF4aXMucmVuZGVyZXIubWluR3JpZERpc3RhbmNlID0gMzA7XHJcbiAgICAgICAgY2F0ZWdvcnlBeGlzLnJlbmRlcmVyLmxhYmVscy50ZW1wbGF0ZS5ob3Jpem9udGFsQ2VudGVyID0gXCJyaWdodFwiO1xyXG4gICAgICAgIGNhdGVnb3J5QXhpcy5yZW5kZXJlci5sYWJlbHMudGVtcGxhdGUudmVydGljYWxDZW50ZXIgPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIGNhdGVnb3J5QXhpcy50b29sdGlwLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBjYXRlZ29yeUF4aXMucmVuZGVyZXIubWluSGVpZ2h0ID0gMTEwO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWVBeGlzID0gY2hhcnQueUF4ZXMucHVzaChuZXcgYW00Y2hhcnRzLlZhbHVlQXhpcygpKTtcclxuICAgICAgICB2YWx1ZUF4aXMucmVuZGVyZXIubWluV2lkdGggPSA1MDtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBjaGFydC5zZXJpZXMucHVzaChuZXcgYW00Y2hhcnRzLkNvbHVtblNlcmllcygpKTtcclxuICAgICAgICBzZXJpZXMuc2VxdWVuY2VkSW50ZXJwb2xhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHNlcmllcy5kYXRhRmllbGRzLnZhbHVlWSA9IFwiTk9fT0ZfUE9MSUNJRVNfQk9VR0hUXCI7XHJcbiAgICAgICAgc2VyaWVzLmRhdGFGaWVsZHMuY2F0ZWdvcnlYID0gXCJVTklRVUVfTU9OVEhcIjtcclxuICAgICAgICBzZXJpZXMudG9vbHRpcFRleHQgPSBcIntDVVNUT01FUl9SRUdJT059IDoge3ZhbHVlWX1bL11cIjtcclxuICAgICAgICBzZXJpZXMuY29sdW1ucy50ZW1wbGF0ZS5zdHJva2VXaWR0aCA9IDA7XHJcblxyXG4gICAgICAgIHNlcmllcy50b29sdGlwLnBvaW50ZXJPcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcclxuXHJcbiAgICAgICAgc2VyaWVzLmNvbHVtbnMudGVtcGxhdGUuY29sdW1uLmNvcm5lclJhZGl1c1RvcExlZnQgPSAxMDtcclxuICAgICAgICBzZXJpZXMuY29sdW1ucy50ZW1wbGF0ZS5jb2x1bW4uY29ybmVyUmFkaXVzVG9wUmlnaHQgPSAxMDtcclxuICAgICAgICBzZXJpZXMuY29sdW1ucy50ZW1wbGF0ZS5jb2x1bW4uZmlsbE9wYWNpdHkgPSAwLjg7XHJcblxyXG4gICAgICAgIC8vIG9uIGhvdmVyLCBtYWtlIGNvcm5lciByYWRpdXNlcyBiaWdnZXJcclxuICAgICAgICBsZXQgaG92ZXJTdGF0ZSA9IHNlcmllcy5jb2x1bW5zLnRlbXBsYXRlLmNvbHVtbi5zdGF0ZXMuY3JlYXRlKFwiaG92ZXJcIik7XHJcbiAgICAgICAgaG92ZXJTdGF0ZS5wcm9wZXJ0aWVzLmNvcm5lclJhZGl1c1RvcExlZnQgPSAwO1xyXG4gICAgICAgIGhvdmVyU3RhdGUucHJvcGVydGllcy5jb3JuZXJSYWRpdXNUb3BSaWdodCA9IDA7XHJcbiAgICAgICAgaG92ZXJTdGF0ZS5wcm9wZXJ0aWVzLmZpbGxPcGFjaXR5ID0gMTtcclxuXHJcbiAgICAgICAgc2VyaWVzLmNvbHVtbnMudGVtcGxhdGUuYWRhcHRlci5hZGQoXCJmaWxsXCIsIChmaWxsLCB0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0LmNvbG9ycy5nZXRJbmRleCh0YXJnZXQuZGF0YUl0ZW0uaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDdXJzb3JcclxuICAgICAgICBjaGFydC5jdXJzb3IgPSBuZXcgYW00Y2hhcnRzLlhZQ3Vyc29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjcmVhdGVCYXJDaGFydCgpO1xyXG4gICAgfSwgW2NoYXJ0RGF0YV0pXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJiYXJDaGFydGRpdlwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjg1dmhcIiB9fT48L2Rpdj5cclxuICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgKTtcclxuXHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/charts/barchart.js\n");

/***/ }),

/***/ "./components/datatables/policyDetailsDatatable.js":
/*!*********************************************************!*\
  !*** ./components/datatables/policyDetailsDatatable.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PolicyDetailsDataTable; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mui-datatables */ \"./node_modules/mui-datatables/dist/index.js\");\n/* harmony import */ var mui_datatables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mui_datatables__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_dataTableColumns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/dataTableColumns */ \"./components/utils/dataTableColumns.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ \"./node_modules/@material-ui/core/esm/TextField/index.js\");\n/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Dialog */ \"./node_modules/@material-ui/core/esm/Dialog/index.js\");\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/DialogActions */ \"./node_modules/@material-ui/core/esm/DialogActions/index.js\");\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/DialogContent */ \"./node_modules/@material-ui/core/esm/DialogContent/index.js\");\n/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ \"./node_modules/@material-ui/core/esm/DialogTitle/index.js\");\n/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/InputLabel */ \"./node_modules/@material-ui/core/esm/InputLabel/index.js\");\n/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/MenuItem */ \"./node_modules/@material-ui/core/esm/MenuItem/index.js\");\n/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/FormControl */ \"./node_modules/@material-ui/core/esm/FormControl/index.js\");\n/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Select */ \"./node_modules/@material-ui/core/esm/Select/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-promise-tracker */ \"./node_modules/react-promise-tracker/lib/index.js\");\n/* harmony import */ var react_promise_tracker__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Tooltip */ \"./node_modules/@material-ui/core/esm/Tooltip/index.js\");\n/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Add */ \"./node_modules/@material-ui/icons/Add.js\");\n/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Snackbar */ \"./node_modules/@material-ui/core/esm/Snackbar/index.js\");\n/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/lab/Alert */ \"./node_modules/@material-ui/lab/esm/Alert/index.js\");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/esm/Grid/index.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__[\"makeStyles\"])(theme => ({\n  formControl: {\n    margin: theme.spacing(1),\n    minWidth: 120\n  },\n  padBottom: {\n    paddingBottom: '5px'\n  }\n}));\n\nfunction Alert(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_20__[\"default\"], _extends({\n    elevation: 6,\n    variant: \"filled\"\n  }, props));\n}\n\nfunction PolicyDetailsDataTable() {\n  const classes = useStyles();\n  const [getPolicyDetailsData, setPolicyDetailsData] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getVehicleSegmentsData, setVehicleSegments] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getFuelTypesData, setFuelTypes] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getCustomerGendersData, setCustomerGenders] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getCustomerIncomeGroupsData, setCustomerIncomeGroups] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getCustomerRegionsData, setCustomerRegions] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getBoolValuesData, setBoolValues] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getSelectedPolicyData, setSelectedPolicyData] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [getSelectedVehicleSegment, setSelectedVehicleSegment] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedFuelType, setSelectedFuelType] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedCustomerGender, setSelectedCustomerGender] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedCustomerIncomeGroups, setSelectedCustomerIncomeGroups] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedCustomerRegions, setSelectedCustomerRegions] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedBodilyInjuryLiability, setSelectedBodilyInjuryLiability] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedPersonalInjuryProtection, setSelectedPersonalInjuryProtection] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedPropertyDamageLiability, setSelectedPropertyDamageLiability] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedCollision, setSelectedCollision] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedComprehensive, setSelectedComprehensive] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getSelectedCustomerMaritalStatus, setSelectedCustomerMaritalStatus] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [getPremiumValue, setPremiumValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [alertOpen, setAlertOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [validationError, setValidationError] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [premiumValidationMessage, setPremiumValidationMessage] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n\n  const handleClickOpen = () => {\n    setOpen(true);\n  };\n\n  const handleClose = () => {\n    setOpen(false);\n  };\n\n  const handleAlertClose = () => {\n    setAlertOpen(false);\n  };\n\n  const validatePremiumField = premiumValue => {\n    if (premiumValue > 1000000) {\n      setPremiumValidationMessage('Premium value should not be greater than 1,000,000(1 million)');\n      setValidationError(true);\n    } else {\n      setPremiumValidationMessage('');\n      setValidationError(false);\n    }\n  };\n\n  const getAllPoliciesDetails = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getPoliciesDetails/');\n      setPolicyDetailsData(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  const getAllVehicleSegments = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getAllVehicleSegments/');\n      setVehicleSegments(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  const getFuelType = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getFuelType/');\n      setFuelTypes(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  const getCustomerGender = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getCustomerGender/');\n      setCustomerGenders(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  const getCustomerIncomeGroups = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getCustomerIncomeGroups/');\n      setCustomerIncomeGroups(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  const getCustomerRegions = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getCustomerRegions/');\n      setCustomerRegions(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  const getBoolValues = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/api/getBoolValues/');\n      setBoolValues(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getAllPoliciesDetails());\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getAllVehicleSegments());\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getFuelType());\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getCustomerGender());\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getCustomerIncomeGroups());\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getCustomerRegions());\n    Object(react_promise_tracker__WEBPACK_IMPORTED_MODULE_15__[\"trackPromise\"])(getBoolValues());\n  }, []);\n  const options = {\n    searchPlaceholder: 'Search Policy',\n    filterType: 'multiselect',\n    fixedHeader: true,\n    fixedSelectColumn: true,\n    print: false,\n    tableBodyHeight: '400px',\n    selectableRows: 'none',\n    onRowClick: rowData => {\n      {\n        handleClickOpen();\n        setSelectedPolicyData(getPolicyDetailsData.find(id => id.POLICY_ID === rowData[0]));\n      }\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(mui_datatables__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    title: \"Policy Details\",\n    data: getPolicyDetailsData,\n    columns: _utils_dataTableColumns__WEBPACK_IMPORTED_MODULE_2__[\"PolicyDetailsColumns\"],\n    options: options\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    open: open,\n    onClose: handleClose,\n    \"aria-labelledby\": \"form-dialog-title\",\n    fullWidth: true,\n    maxWidth: \"xl\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    id: \"form-dialog-title\"\n  }, \"Add New Shift Allowance\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    className: classes.root\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    container: true,\n    spacing: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    margin: \"dense\",\n    id: \"policyid\",\n    label: \"Policy Id\",\n    disabled: true,\n    fullWidth: true,\n    value: getSelectedPolicyData.POLICY_ID\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    className: classes.root,\n    noValidate: true,\n    autoComplete: \"off\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    error: validationError,\n    margin: \"dense\",\n    id: \"premium\",\n    label: \"Premium\",\n    fullWidth: true,\n    value: getPremiumValue,\n    onChange: event => {\n      setPremiumValue(event.target.value);\n      validatePremiumField(event.target.value);\n    },\n    helperText: premiumValidationMessage\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    margin: \"dense\",\n    id: \"dateofpurchase\",\n    label: \"Date of Purchase\",\n    disabled: true,\n    fullWidth: true,\n    value: getSelectedPolicyData.DATE_OF_PURCHASE\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Vehicle Segment\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedVehicleSegment,\n    onChange: event => setSelectedVehicleSegment(event.target.value)\n  }, getVehicleSegmentsData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.VEHICLE_SEGMENT\n    }, option.VEHICLE_SEGMENT);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Fuel Type\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedFuelType,\n    onChange: event => setSelectedFuelType(event.target.value)\n  }, getFuelTypesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.FUEL\n    }, option.FUEL);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Bodily Injury Liability\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedBodilyInjuryLiability,\n    onChange: event => setSelectedBodilyInjuryLiability(event.target.value)\n  }, getBoolValuesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.BOOL_VALUES\n    }, option.BOOL_VALUES);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Personal Injury Protection\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedPersonalInjuryProtection,\n    onChange: event => setSelectedPersonalInjuryProtection(event.target.value)\n  }, getBoolValuesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.BOOL_VALUES\n    }, option.BOOL_VALUES);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Property Damage Liability\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedPropertyDamageLiability,\n    onChange: event => setSelectedPropertyDamageLiability(event.target.value)\n  }, getBoolValuesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.BOOL_VALUES\n    }, option.BOOL_VALUES);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Collision\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedCollision,\n    onChange: event => setSelectedCollision(event.target.value)\n  }, getBoolValuesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.BOOL_VALUES\n    }, option.BOOL_VALUES);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Comprehensive\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedComprehensive,\n    onChange: event => setSelectedComprehensive(event.target.value)\n  }, getBoolValuesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.BOOL_VALUES\n    }, option.BOOL_VALUES);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    margin: \"dense\",\n    id: \"customerid\",\n    label: \"Customer Id\",\n    disabled: true,\n    fullWidth: true,\n    value: getSelectedPolicyData.CUSTOMER_ID\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Customer Gender\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedCustomerGender,\n    onChange: event => setSelectedCustomerGender(event.target.value)\n  }, getCustomerGendersData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.CUSTOMER_GENDER\n    }, option.CUSTOMER_GENDER);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Customer Income Group\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedCustomerIncomeGroups,\n    onChange: event => setSelectedCustomerIncomeGroups(event.target.value)\n  }, getCustomerIncomeGroupsData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.INCOME_GROUP\n    }, option.INCOME_GROUP);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Customer Region\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedCustomerRegions,\n    onChange: event => setSelectedCustomerRegions(event.target.value)\n  }, getCustomerRegionsData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.CUSTOMER_REGION\n    }, option.CUSTOMER_REGION);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    item: true,\n    xs: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.formControl,\n    fullWidth: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    id: \"demo-simple-select-helper-label\"\n  }, \"Customer Marital Status\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    labelId: \"demo-simple-select-helper-label\",\n    id: \"demo-simple-select-helper\",\n    value: getSelectedCustomerMaritalStatus,\n    onChange: event => setSelectedCustomerMaritalStatus(event.target.value)\n  }, getBoolValuesData.map((option, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      key: option.MASTER_ID,\n      value: option.BOOL_VALUES\n    }, option.BOOL_VALUES);\n  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    variant: \"contained\",\n    color: \"primary\",\n    disabled: validationError === true\n  }, \"Submit\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    onClick: handleClose,\n    variant: \"outlined\",\n    color: \"secondary\"\n  }, \"Close\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    anchorOrigin: {\n      vertical: 'top',\n      horizontal: 'center'\n    },\n    open: alertOpen,\n    autoHideDuration: 3000,\n    onClose: handleAlertClose\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {\n    onClose: handleClose,\n    severity: \"success\"\n  }, \"Saved Successfully!\")));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2RhdGF0YWJsZXMvcG9saWN5RGV0YWlsc0RhdGF0YWJsZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NvbXBvbmVudHMvZGF0YXRhYmxlcy9wb2xpY3lEZXRhaWxzRGF0YXRhYmxlLmpzPzE5MTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCBGcmFnbWVudCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTVVJRGF0YVRhYmxlIGZyb20gXCJtdWktZGF0YXRhYmxlc1wiO1xyXG5pbXBvcnQgeyBQb2xpY3lEZXRhaWxzQ29sdW1ucyB9IGZyb20gJy4uL3V0aWxzL2RhdGFUYWJsZUNvbHVtbnMnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0J1dHRvbic7XHJcbmltcG9ydCBUZXh0RmllbGQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVGV4dEZpZWxkJztcclxuaW1wb3J0IERpYWxvZyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2cnO1xyXG5pbXBvcnQgRGlhbG9nQWN0aW9ucyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dBY3Rpb25zJztcclxuaW1wb3J0IERpYWxvZ0NvbnRlbnQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQ29udGVudCc7XHJcbmltcG9ydCBEaWFsb2dUaXRsZSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dUaXRsZSc7XHJcbmltcG9ydCBJbnB1dExhYmVsIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0lucHV0TGFiZWwnO1xyXG5pbXBvcnQgTWVudUl0ZW0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTWVudUl0ZW0nO1xyXG5pbXBvcnQgRm9ybUNvbnRyb2wgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRm9ybUNvbnRyb2wnO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1NlbGVjdCc7XHJcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyB0cmFja1Byb21pc2UgfSBmcm9tICdyZWFjdC1wcm9taXNlLXRyYWNrZXInO1xyXG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvSWNvbkJ1dHRvblwiO1xyXG5pbXBvcnQgVG9vbHRpcCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVG9vbHRpcFwiO1xyXG5pbXBvcnQgQWRkSWNvbiBmcm9tIFwiQG1hdGVyaWFsLXVpL2ljb25zL0FkZFwiO1xyXG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvU25hY2tiYXInO1xyXG5pbXBvcnQgTXVpQWxlcnQgZnJvbSAnQG1hdGVyaWFsLXVpL2xhYi9BbGVydCc7XHJcbmltcG9ydCBHcmlkIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0dyaWQnO1xyXG5cclxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcygodGhlbWUpID0+ICh7XHJcblxyXG4gICAgZm9ybUNvbnRyb2w6IHtcclxuICAgICAgICBtYXJnaW46IHRoZW1lLnNwYWNpbmcoMSksXHJcbiAgICAgICAgbWluV2lkdGg6IDEyMCxcclxuICAgIH0sXHJcbiAgICBwYWRCb3R0b206IHtcclxuICAgICAgICBwYWRkaW5nQm90dG9tOiAnNXB4J1xyXG4gICAgfVxyXG59KSk7XHJcblxyXG5mdW5jdGlvbiBBbGVydChwcm9wcykge1xyXG4gICAgcmV0dXJuIDxNdWlBbGVydCBlbGV2YXRpb249ezZ9IHZhcmlhbnQ9XCJmaWxsZWRcIiB7Li4ucHJvcHN9IC8+O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb2xpY3lEZXRhaWxzRGF0YVRhYmxlKCkge1xyXG4gICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xyXG5cclxuICAgIGNvbnN0IFtnZXRQb2xpY3lEZXRhaWxzRGF0YSwgc2V0UG9saWN5RGV0YWlsc0RhdGFdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW2dldFZlaGljbGVTZWdtZW50c0RhdGEsIHNldFZlaGljbGVTZWdtZW50c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbZ2V0RnVlbFR5cGVzRGF0YSwgc2V0RnVlbFR5cGVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtnZXRDdXN0b21lckdlbmRlcnNEYXRhLCBzZXRDdXN0b21lckdlbmRlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW2dldEN1c3RvbWVySW5jb21lR3JvdXBzRGF0YSwgc2V0Q3VzdG9tZXJJbmNvbWVHcm91cHNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW2dldEN1c3RvbWVyUmVnaW9uc0RhdGEsIHNldEN1c3RvbWVyUmVnaW9uc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbZ2V0Qm9vbFZhbHVlc0RhdGEsIHNldEJvb2xWYWx1ZXNdID0gdXNlU3RhdGUoW10pO1xyXG5cclxuICAgIGNvbnN0IFtnZXRTZWxlY3RlZFBvbGljeURhdGEsIHNldFNlbGVjdGVkUG9saWN5RGF0YV0gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkVmVoaWNsZVNlZ21lbnQsIHNldFNlbGVjdGVkVmVoaWNsZVNlZ21lbnRdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkRnVlbFR5cGUsIHNldFNlbGVjdGVkRnVlbFR5cGVdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkQ3VzdG9tZXJHZW5kZXIsIHNldFNlbGVjdGVkQ3VzdG9tZXJHZW5kZXJdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkQ3VzdG9tZXJJbmNvbWVHcm91cHMsIHNldFNlbGVjdGVkQ3VzdG9tZXJJbmNvbWVHcm91cHNdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkQ3VzdG9tZXJSZWdpb25zLCBzZXRTZWxlY3RlZEN1c3RvbWVyUmVnaW9uc10gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBbZ2V0U2VsZWN0ZWRCb2RpbHlJbmp1cnlMaWFiaWxpdHksIHNldFNlbGVjdGVkQm9kaWx5SW5qdXJ5TGlhYmlsaXR5XSA9IHVzZVN0YXRlKCcnKTtcclxuICAgIGNvbnN0IFtnZXRTZWxlY3RlZFBlcnNvbmFsSW5qdXJ5UHJvdGVjdGlvbiwgc2V0U2VsZWN0ZWRQZXJzb25hbEluanVyeVByb3RlY3Rpb25dID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkUHJvcGVydHlEYW1hZ2VMaWFiaWxpdHksIHNldFNlbGVjdGVkUHJvcGVydHlEYW1hZ2VMaWFiaWxpdHldID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkQ29sbGlzaW9uLCBzZXRTZWxlY3RlZENvbGxpc2lvbl0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBbZ2V0U2VsZWN0ZWRDb21wcmVoZW5zaXZlLCBzZXRTZWxlY3RlZENvbXByZWhlbnNpdmVdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW2dldFNlbGVjdGVkQ3VzdG9tZXJNYXJpdGFsU3RhdHVzLCBzZXRTZWxlY3RlZEN1c3RvbWVyTWFyaXRhbFN0YXR1c10gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBbZ2V0UHJlbWl1bVZhbHVlLCBzZXRQcmVtaXVtVmFsdWVdID0gdXNlU3RhdGUoJycpO1xyXG5cclxuXHJcbiAgICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBbYWxlcnRPcGVuLCBzZXRBbGVydE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgY29uc3QgW3ZhbGlkYXRpb25FcnJvciwgc2V0VmFsaWRhdGlvbkVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IFtwcmVtaXVtVmFsaWRhdGlvbk1lc3NhZ2UsIHNldFByZW1pdW1WYWxpZGF0aW9uTWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tPcGVuID0gKCkgPT4ge1xyXG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVBbGVydENsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgIHNldEFsZXJ0T3BlbihmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHZhbGlkYXRlUHJlbWl1bUZpZWxkID0gKHByZW1pdW1WYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmIChwcmVtaXVtVmFsdWUgPiAxMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHNldFByZW1pdW1WYWxpZGF0aW9uTWVzc2FnZSgnUHJlbWl1bSB2YWx1ZSBzaG91bGQgbm90IGJlIGdyZWF0ZXIgdGhhbiAxLDAwMCwwMDAoMSBtaWxsaW9uKScpO1xyXG4gICAgICAgICAgICBzZXRWYWxpZGF0aW9uRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRQcmVtaXVtVmFsaWRhdGlvbk1lc3NhZ2UoJycpO1xyXG4gICAgICAgICAgICBzZXRWYWxpZGF0aW9uRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0QWxsUG9saWNpZXNEZXRhaWxzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2dldFBvbGljaWVzRGV0YWlscy8nKTtcclxuICAgICAgICAgICAgc2V0UG9saWN5RGV0YWlsc0RhdGEocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRBbGxWZWhpY2xlU2VnbWVudHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvZ2V0QWxsVmVoaWNsZVNlZ21lbnRzLycpO1xyXG4gICAgICAgICAgICBzZXRWZWhpY2xlU2VnbWVudHMocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRGdWVsVHlwZSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9nZXRGdWVsVHlwZS8nKTtcclxuICAgICAgICAgICAgc2V0RnVlbFR5cGVzKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0Q3VzdG9tZXJHZW5kZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvZ2V0Q3VzdG9tZXJHZW5kZXIvJyk7XHJcbiAgICAgICAgICAgIHNldEN1c3RvbWVyR2VuZGVycyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldEN1c3RvbWVySW5jb21lR3JvdXBzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2dldEN1c3RvbWVySW5jb21lR3JvdXBzLycpO1xyXG4gICAgICAgICAgICBzZXRDdXN0b21lckluY29tZUdyb3VwcyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldEN1c3RvbWVyUmVnaW9ucyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9nZXRDdXN0b21lclJlZ2lvbnMvJyk7XHJcbiAgICAgICAgICAgIHNldEN1c3RvbWVyUmVnaW9ucyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldEJvb2xWYWx1ZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvZ2V0Qm9vbFZhbHVlcy8nKTtcclxuICAgICAgICAgICAgc2V0Qm9vbFZhbHVlcyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgdHJhY2tQcm9taXNlKGdldEFsbFBvbGljaWVzRGV0YWlscygpKTtcclxuICAgICAgICB0cmFja1Byb21pc2UoZ2V0QWxsVmVoaWNsZVNlZ21lbnRzKCkpO1xyXG4gICAgICAgIHRyYWNrUHJvbWlzZShnZXRGdWVsVHlwZSgpKTtcclxuICAgICAgICB0cmFja1Byb21pc2UoZ2V0Q3VzdG9tZXJHZW5kZXIoKSk7XHJcbiAgICAgICAgdHJhY2tQcm9taXNlKGdldEN1c3RvbWVySW5jb21lR3JvdXBzKCkpO1xyXG4gICAgICAgIHRyYWNrUHJvbWlzZShnZXRDdXN0b21lclJlZ2lvbnMoKSk7XHJcbiAgICAgICAgdHJhY2tQcm9taXNlKGdldEJvb2xWYWx1ZXMoKSk7XHJcbiAgICB9LCBbXSlcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoIFBvbGljeScsXHJcbiAgICAgICAgZmlsdGVyVHlwZTogJ211bHRpc2VsZWN0JyxcclxuICAgICAgICBmaXhlZEhlYWRlcjogdHJ1ZSxcclxuICAgICAgICBmaXhlZFNlbGVjdENvbHVtbjogdHJ1ZSxcclxuICAgICAgICBwcmludDogZmFsc2UsXHJcbiAgICAgICAgdGFibGVCb2R5SGVpZ2h0OiAnNDAwcHgnLFxyXG4gICAgICAgIHNlbGVjdGFibGVSb3dzOiAnbm9uZScsXHJcbiAgICAgICAgb25Sb3dDbGljazogKHJvd0RhdGEpID0+IHtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2xpY2tPcGVuKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZFBvbGljeURhdGEoZ2V0UG9saWN5RGV0YWlsc0RhdGEuZmluZChpZCA9PiBpZC5QT0xJQ1lfSUQgPT09IHJvd0RhdGFbMF0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxGcmFnbWVudD5cclxuICAgICAgICAgICAgPE1VSURhdGFUYWJsZVxyXG4gICAgICAgICAgICAgICAgdGl0bGU9e1wiUG9saWN5IERldGFpbHNcIn1cclxuICAgICAgICAgICAgICAgIGRhdGE9e2dldFBvbGljeURldGFpbHNEYXRhfVxyXG4gICAgICAgICAgICAgICAgY29sdW1ucz17UG9saWN5RGV0YWlsc0NvbHVtbnN9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgPERpYWxvZyBvcGVuPXtvcGVufSBvbkNsb3NlPXtoYW5kbGVDbG9zZX0gYXJpYS1sYWJlbGxlZGJ5PVwiZm9ybS1kaWFsb2ctdGl0bGVcIiBmdWxsV2lkdGhcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoPVwieGxcIj5cclxuICAgICAgICAgICAgICAgIDxEaWFsb2dUaXRsZSBpZD1cImZvcm0tZGlhbG9nLXRpdGxlXCI+QWRkIE5ldyBTaGlmdCBBbGxvd2FuY2U8L0RpYWxvZ1RpdGxlPlxyXG4gICAgICAgICAgICAgICAgPERpYWxvZ0NvbnRlbnQgY2xhc3NOYW1lPXtjbGFzc2VzLnJvb3R9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxHcmlkIGNvbnRhaW5lciBzcGFjaW5nPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luPVwiZGVuc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwicG9saWN5aWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUG9saWN5IElkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnZXRTZWxlY3RlZFBvbGljeURhdGEuUE9MSUNZX0lEfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT17Y2xhc3Nlcy5yb290fSBub1ZhbGlkYXRlIGF1dG9Db21wbGV0ZT1cIm9mZlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I9e3ZhbGlkYXRpb25FcnJvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luPVwiZGVuc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInByZW1pdW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlByZW1pdW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFByZW1pdW1WYWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4geyBzZXRQcmVtaXVtVmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKTsgdmFsaWRhdGVQcmVtaXVtRmllbGQoZXZlbnQudGFyZ2V0LnZhbHVlKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJUZXh0PXtwcmVtaXVtVmFsaWRhdGlvbk1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW49XCJkZW5zZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkYXRlb2ZwdXJjaGFzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJEYXRlIG9mIFB1cmNoYXNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnZXRTZWxlY3RlZFBvbGljeURhdGEuREFURV9PRl9QVVJDSEFTRX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY2xhc3NOYW1lPXtjbGFzc2VzLmZvcm1Db250cm9sfSBmdWxsV2lkdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0TGFiZWwgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCI+VmVoaWNsZSBTZWdtZW50PC9JbnB1dExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0U2VsZWN0ZWRWZWhpY2xlU2VnbWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRWZWhpY2xlU2VnbWVudChldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFZlaGljbGVTZWdtZW50c0RhdGEubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1lbnVJdGVtIGtleT17b3B0aW9uLk1BU1RFUl9JRH0gdmFsdWU9e29wdGlvbi5WRUhJQ0xFX1NFR01FTlR9PntvcHRpb24uVkVISUNMRV9TRUdNRU5UfTwvTWVudUl0ZW0+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY2xhc3NOYW1lPXtjbGFzc2VzLmZvcm1Db250cm9sfSBmdWxsV2lkdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0TGFiZWwgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCI+RnVlbCBUeXBlPC9JbnB1dExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0U2VsZWN0ZWRGdWVsVHlwZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRGdWVsVHlwZShldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldEZ1ZWxUeXBlc0RhdGEubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1lbnVJdGVtIGtleT17b3B0aW9uLk1BU1RFUl9JRH0gdmFsdWU9e29wdGlvbi5GVUVMfT57b3B0aW9uLkZVRUx9PC9NZW51SXRlbT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjbGFzc05hbWU9e2NsYXNzZXMuZm9ybUNvbnRyb2x9IGZ1bGxXaWR0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRMYWJlbCBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIj5Cb2RpbHkgSW5qdXJ5IExpYWJpbGl0eTwvSW5wdXRMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsSWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFNlbGVjdGVkQm9kaWx5SW5qdXJ5TGlhYmlsaXR5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWxlY3RlZEJvZGlseUluanVyeUxpYWJpbGl0eShldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldEJvb2xWYWx1ZXNEYXRhLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxNZW51SXRlbSBrZXk9e29wdGlvbi5NQVNURVJfSUR9IHZhbHVlPXtvcHRpb24uQk9PTF9WQUxVRVN9PntvcHRpb24uQk9PTF9WQUxVRVN9PC9NZW51SXRlbT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjbGFzc05hbWU9e2NsYXNzZXMuZm9ybUNvbnRyb2x9IGZ1bGxXaWR0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRMYWJlbCBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIj5QZXJzb25hbCBJbmp1cnkgUHJvdGVjdGlvbjwvSW5wdXRMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsSWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFNlbGVjdGVkUGVyc29uYWxJbmp1cnlQcm90ZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWxlY3RlZFBlcnNvbmFsSW5qdXJ5UHJvdGVjdGlvbihldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldEJvb2xWYWx1ZXNEYXRhLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxNZW51SXRlbSBrZXk9e29wdGlvbi5NQVNURVJfSUR9IHZhbHVlPXtvcHRpb24uQk9PTF9WQUxVRVN9PntvcHRpb24uQk9PTF9WQUxVRVN9PC9NZW51SXRlbT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjbGFzc05hbWU9e2NsYXNzZXMuZm9ybUNvbnRyb2x9IGZ1bGxXaWR0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRMYWJlbCBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIj5Qcm9wZXJ0eSBEYW1hZ2UgTGlhYmlsaXR5PC9JbnB1dExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0U2VsZWN0ZWRQcm9wZXJ0eURhbWFnZUxpYWJpbGl0eX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRQcm9wZXJ0eURhbWFnZUxpYWJpbGl0eShldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldEJvb2xWYWx1ZXNEYXRhLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxNZW51SXRlbSBrZXk9e29wdGlvbi5NQVNURVJfSUR9IHZhbHVlPXtvcHRpb24uQk9PTF9WQUxVRVN9PntvcHRpb24uQk9PTF9WQUxVRVN9PC9NZW51SXRlbT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjbGFzc05hbWU9e2NsYXNzZXMuZm9ybUNvbnRyb2x9IGZ1bGxXaWR0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRMYWJlbCBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIj5Db2xsaXNpb248L0lucHV0TGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbElkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlci1sYWJlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnZXRTZWxlY3RlZENvbGxpc2lvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRDb2xsaXNpb24oZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRCb29sVmFsdWVzRGF0YS5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TWVudUl0ZW0ga2V5PXtvcHRpb24uTUFTVEVSX0lEfSB2YWx1ZT17b3B0aW9uLkJPT0xfVkFMVUVTfT57b3B0aW9uLkJPT0xfVkFMVUVTfTwvTWVudUl0ZW0+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY2xhc3NOYW1lPXtjbGFzc2VzLmZvcm1Db250cm9sfSBmdWxsV2lkdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0TGFiZWwgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCI+Q29tcHJlaGVuc2l2ZTwvSW5wdXRMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsSWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFNlbGVjdGVkQ29tcHJlaGVuc2l2ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRDb21wcmVoZW5zaXZlKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0Qm9vbFZhbHVlc0RhdGEubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1lbnVJdGVtIGtleT17b3B0aW9uLk1BU1RFUl9JRH0gdmFsdWU9e29wdGlvbi5CT09MX1ZBTFVFU30+e29wdGlvbi5CT09MX1ZBTFVFU308L01lbnVJdGVtPjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezN9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbj1cImRlbnNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImN1c3RvbWVyaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQ3VzdG9tZXIgSWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFNlbGVjdGVkUG9saWN5RGF0YS5DVVNUT01FUl9JRH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY2xhc3NOYW1lPXtjbGFzc2VzLmZvcm1Db250cm9sfSBmdWxsV2lkdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0TGFiZWwgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCI+Q3VzdG9tZXIgR2VuZGVyPC9JbnB1dExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0U2VsZWN0ZWRDdXN0b21lckdlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRDdXN0b21lckdlbmRlcihldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldEN1c3RvbWVyR2VuZGVyc0RhdGEubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1lbnVJdGVtIGtleT17b3B0aW9uLk1BU1RFUl9JRH0gdmFsdWU9e29wdGlvbi5DVVNUT01FUl9HRU5ERVJ9PntvcHRpb24uQ1VTVE9NRVJfR0VOREVSfTwvTWVudUl0ZW0+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQgaXRlbSB4cz17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgY2xhc3NOYW1lPXtjbGFzc2VzLmZvcm1Db250cm9sfSBmdWxsV2lkdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0TGFiZWwgaWQ9XCJkZW1vLXNpbXBsZS1zZWxlY3QtaGVscGVyLWxhYmVsXCI+Q3VzdG9tZXIgSW5jb21lIEdyb3VwPC9JbnB1dExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0U2VsZWN0ZWRDdXN0b21lckluY29tZUdyb3Vwc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRDdXN0b21lckluY29tZUdyb3VwcyhldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldEN1c3RvbWVySW5jb21lR3JvdXBzRGF0YS5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TWVudUl0ZW0ga2V5PXtvcHRpb24uTUFTVEVSX0lEfSB2YWx1ZT17b3B0aW9uLklOQ09NRV9HUk9VUH0+e29wdGlvbi5JTkNPTUVfR1JPVVB9PC9NZW51SXRlbT47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXszfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjbGFzc05hbWU9e2NsYXNzZXMuZm9ybUNvbnRyb2x9IGZ1bGxXaWR0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRMYWJlbCBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIj5DdXN0b21lciBSZWdpb248L0lucHV0TGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbElkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlci1sYWJlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnZXRTZWxlY3RlZEN1c3RvbWVyUmVnaW9uc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRDdXN0b21lclJlZ2lvbnMoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDdXN0b21lclJlZ2lvbnNEYXRhLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxNZW51SXRlbSBrZXk9e29wdGlvbi5NQVNURVJfSUR9IHZhbHVlPXtvcHRpb24uQ1VTVE9NRVJfUkVHSU9OfT57b3B0aW9uLkNVU1RPTUVSX1JFR0lPTn08L01lbnVJdGVtPjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezN9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIGNsYXNzTmFtZT17Y2xhc3Nlcy5mb3JtQ29udHJvbH0gZnVsbFdpZHRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dExhYmVsIGlkPVwiZGVtby1zaW1wbGUtc2VsZWN0LWhlbHBlci1sYWJlbFwiPkN1c3RvbWVyIE1hcml0YWwgU3RhdHVzPC9JbnB1dExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXItbGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRlbW8tc2ltcGxlLXNlbGVjdC1oZWxwZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0U2VsZWN0ZWRDdXN0b21lck1hcml0YWxTdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNlbGVjdGVkQ3VzdG9tZXJNYXJpdGFsU3RhdHVzKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0Qm9vbFZhbHVlc0RhdGEubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1lbnVJdGVtIGtleT17b3B0aW9uLk1BU1RFUl9JRH0gdmFsdWU9e29wdGlvbi5CT09MX1ZBTFVFU30+e29wdGlvbi5CT09MX1ZBTFVFU308L01lbnVJdGVtPjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgPC9EaWFsb2dDb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPERpYWxvZ0FjdGlvbnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiY29udGFpbmVkXCIgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ZhbGlkYXRpb25FcnJvciA9PT0gdHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1Ym1pdFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlQ2xvc2V9IHZhcmlhbnQ9XCJvdXRsaW5lZFwiIGNvbG9yPVwic2Vjb25kYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENsb3NlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0RpYWxvZ0FjdGlvbnM+XHJcbiAgICAgICAgICAgIDwvRGlhbG9nPlxyXG5cclxuXHJcbiAgICAgICAgICAgIDxTbmFja2JhciBhbmNob3JPcmlnaW49e3sgdmVydGljYWw6ICd0b3AnLCBob3Jpem9udGFsOiAnY2VudGVyJyB9fSBvcGVuPXthbGVydE9wZW59IGF1dG9IaWRlRHVyYXRpb249ezMwMDB9IG9uQ2xvc2U9e2hhbmRsZUFsZXJ0Q2xvc2V9PlxyXG4gICAgICAgICAgICAgICAgPEFsZXJ0IG9uQ2xvc2U9e2hhbmRsZUNsb3NlfSBzZXZlcml0eT1cInN1Y2Nlc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICBTYXZlZCBTdWNjZXNzZnVsbHkhXHJcbiAgICAgICAgICAgICA8L0FsZXJ0PlxyXG4gICAgICAgICAgICA8L1NuYWNrYmFyPlxyXG4gICAgICAgIDwvRnJhZ21lbnQgPlxyXG4gICAgKTtcclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFEQTtBQU5BO0FBQ0E7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZ0JBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFSQTtBQVlBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFPQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQU1BIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/datatables/policyDetailsDatatable.js\n");

/***/ }),

/***/ "./components/index.js":
/*!*****************************!*\
  !*** ./components/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/App */ \"./components/App.js\");\n\n\n //import BusyIndicator from '../components/utils/busyIndicator';\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)), document.getElementById(\"content\"));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9pbmRleC5qcz83YmU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQXBwIGZyb20gJy4uL2NvbXBvbmVudHMvQXBwJztcclxuLy9pbXBvcnQgQnVzeUluZGljYXRvciBmcm9tICcuLi9jb21wb25lbnRzL3V0aWxzL2J1c3lJbmRpY2F0b3InO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgIDxBcHAgLz5cclxuICAgICAgICBcclxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIikpOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/index.js\n");

/***/ }),

/***/ "./components/utils/dataTableColumns.js":
/*!**********************************************!*\
  !*** ./components/utils/dataTableColumns.js ***!
  \**********************************************/
/*! exports provided: PolicyDetailsColumns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PolicyDetailsColumns\", function() { return PolicyDetailsColumns; });\nconst PolicyDetailsColumns = [{\n  name: \"POLICY_ID\",\n  label: \"Policy Id\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"PREMIUM\",\n  label: \"Premium\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"DATE_OF_PURCHASE\",\n  label: \"Date of Purchase\",\n  options: {\n    filter: false,\n    sort: false\n  }\n}, {\n  name: \"VEHICLE_SEGMENT\",\n  label: \"Vehicle Segment\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"FUEL\",\n  label: \"Fuel\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"BODILY_INJURY_LIABILITY\",\n  label: \"Bodily Injury Liability\",\n  options: {\n    filter: false,\n    sort: true\n  }\n}, {\n  name: \"PERSONAL_INJURY_PROTECTION\",\n  label: \"Personal Injury Protection\",\n  options: {\n    filter: false,\n    sort: true\n  }\n}, {\n  name: \"PROPERTY_DAMAGE_LIABILITY\",\n  label: \"Property Damage Liability\",\n  options: {\n    filter: false,\n    sort: true\n  }\n}, {\n  name: \"COLLISION\",\n  label: \"Collision\",\n  options: {\n    filter: false,\n    sort: true\n  }\n}, {\n  name: \"COMPREHENSIVE\",\n  label: \"Comprehensive\",\n  options: {\n    filter: false,\n    sort: true\n  }\n}, {\n  name: \"CUSTOMER_ID\",\n  label: \"Customer Id\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"CUSTOMER_GENDER\",\n  label: \"Customer Gender\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"CUSTOMER_INCOME_GROUP\",\n  label: \"Customer Income Group\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"CUSTOMER_REGION\",\n  label: \"Customer Region\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}, {\n  name: \"CUSTOMER_MARITAL_STATUS\",\n  label: \"Customer Marital Status\",\n  options: {\n    filter: true,\n    sort: true\n  }\n}];//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3V0aWxzL2RhdGFUYWJsZUNvbHVtbnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3V0aWxzL2RhdGFUYWJsZUNvbHVtbnMuanM/ZDk1MyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUG9saWN5RGV0YWlsc0NvbHVtbnMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJQT0xJQ1lfSURcIixcclxuICAgICAgICBsYWJlbDogXCJQb2xpY3kgSWRcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiUFJFTUlVTVwiLFxyXG4gICAgICAgIGxhYmVsOiBcIlByZW1pdW1cIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiREFURV9PRl9QVVJDSEFTRVwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkRhdGUgb2YgUHVyY2hhc2VcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJWRUhJQ0xFX1NFR01FTlRcIixcclxuICAgICAgICBsYWJlbDogXCJWZWhpY2xlIFNlZ21lbnRcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiRlVFTFwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkZ1ZWxcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiQk9ESUxZX0lOSlVSWV9MSUFCSUxJVFlcIixcclxuICAgICAgICBsYWJlbDogXCJCb2RpbHkgSW5qdXJ5IExpYWJpbGl0eVwiLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiUEVSU09OQUxfSU5KVVJZX1BST1RFQ1RJT05cIixcclxuICAgICAgICBsYWJlbDogXCJQZXJzb25hbCBJbmp1cnkgUHJvdGVjdGlvblwiLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiUFJPUEVSVFlfREFNQUdFX0xJQUJJTElUWVwiLFxyXG4gICAgICAgIGxhYmVsOiBcIlByb3BlcnR5IERhbWFnZSBMaWFiaWxpdHlcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIkNPTExJU0lPTlwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkNvbGxpc2lvblwiLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiQ09NUFJFSEVOU0lWRVwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkNvbXByZWhlbnNpdmVcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIkNVU1RPTUVSX0lEXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiQ3VzdG9tZXIgSWRcIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiQ1VTVE9NRVJfR0VOREVSXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiQ3VzdG9tZXIgR2VuZGVyXCIsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBmaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIHNvcnQ6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIkNVU1RPTUVSX0lOQ09NRV9HUk9VUFwiLFxyXG4gICAgICAgIGxhYmVsOiBcIkN1c3RvbWVyIEluY29tZSBHcm91cFwiLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBzb3J0OiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJDVVNUT01FUl9SRUdJT05cIixcclxuICAgICAgICBsYWJlbDogXCJDdXN0b21lciBSZWdpb25cIixcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiQ1VTVE9NRVJfTUFSSVRBTF9TVEFUVVNcIixcclxuICAgICAgICBsYWJlbDogXCJDdXN0b21lciBNYXJpdGFsIFN0YXR1c1wiLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBzb3J0OiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/utils/dataTableColumns.js\n");

/***/ }),

/***/ "./components/views/policyDashboardView.js":
/*!*************************************************!*\
  !*** ./components/views/policyDashboardView.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PolicyDashboard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/esm/Grid/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _charts_barchart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../charts/barchart */ \"./components/charts/barchart.js\");\n\n\n\n\nfunction PolicyDashboard() {\n  const [getBarChartData, setBarChartData] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n\n  const getChartData = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/getBarChartData/', {\n        params: {\n          region: 'East'\n        }\n      });\n      setBarChartData(response.data);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    getChartData();\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    item: true,\n    xs: 12,\n    md: 12,\n    lg: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_charts_barchart__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    chartData: getBarChartData\n  })));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3ZpZXdzL3BvbGljeURhc2hib2FyZFZpZXcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3ZpZXdzL3BvbGljeURhc2hib2FyZFZpZXcuanM/MzAyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRnJhZ21lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBHcmlkIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0dyaWQnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgQmFyQ2hhcnQgZnJvbSAnLi4vY2hhcnRzL2JhcmNoYXJ0JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb2xpY3lEYXNoYm9hcmQoKSB7XHJcblxyXG4gICAgY29uc3QgW2dldEJhckNoYXJ0RGF0YSwgc2V0QmFyQ2hhcnREYXRhXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgICBjb25zdCBnZXRDaGFydERhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvZ2V0QmFyQ2hhcnREYXRhLycsIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtczogeyByZWdpb246ICdFYXN0JyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRCYXJDaGFydERhdGEocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGdldENoYXJ0RGF0YSgpO1xyXG4gICAgfSwgW10pXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezEyfSBtZD17MTJ9IGxnPXsxMn0+XHJcbiAgICAgICAgICAgICAgICA8QmFyQ2hhcnQgY2hhcnREYXRhPXtnZXRCYXJDaGFydERhdGF9IC8+XHJcbiAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICA8L0ZyYWdtZW50ID5cclxuICAgICk7XHJcblxyXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFLQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/views/policyDashboardView.js\n");

/***/ }),

/***/ "./components/views/policyDetailsView.js":
/*!***********************************************!*\
  !*** ./components/views/policyDetailsView.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PolicyDetails; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/esm/Grid/index.js\");\n/* harmony import */ var _datatables_policyDetailsDatatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../datatables/policyDetailsDatatable */ \"./components/datatables/policyDetailsDatatable.js\");\n\n\n\nfunction PolicyDetails() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    item: true,\n    xs: 12,\n    md: 12,\n    lg: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_datatables_policyDetailsDatatable__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3ZpZXdzL3BvbGljeURldGFpbHNWaWV3LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy92aWV3cy9wb2xpY3lEZXRhaWxzVmlldy5qcz80NDc1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEdyaWQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvR3JpZCc7XHJcbmltcG9ydCBQb2xpY3lEZXRhaWxzRGF0YVRhYmxlIGZyb20gXCIuLi9kYXRhdGFibGVzL3BvbGljeURldGFpbHNEYXRhdGFibGVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb2xpY3lEZXRhaWxzKCkge1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgICAgICA8R3JpZCBpdGVtIHhzPXsxMn0gbWQ9ezEyfSBsZz17MTJ9PlxyXG4gICAgICAgICAgICAgICAgPFBvbGljeURldGFpbHNEYXRhVGFibGUgLz5cclxuICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgIDwvRnJhZ21lbnQgPlxyXG4gICAgKTtcclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/views/policyDetailsView.js\n");

/***/ }),

/***/ "pdfmake/build/pdfmake.js":
/*!*******************************************!*\
  !*** external "pdfmake/build/pdfmake.js" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pdfmake/build/pdfmake.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmbWFrZS9idWlsZC9wZGZtYWtlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGRmbWFrZS9idWlsZC9wZGZtYWtlLmpzXCI/OWZmMSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZGZtYWtlL2J1aWxkL3BkZm1ha2UuanNcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///pdfmake/build/pdfmake.js\n");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xlsx\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInhsc3hcIj83NTA4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInhsc3hcIik7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///xlsx\n");

/***/ })

/******/ });