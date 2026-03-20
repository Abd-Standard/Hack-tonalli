"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodiumModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const podium_service_1 = require("./podium.service");
const podium_controller_1 = require("./podium.controller");
const weekly_score_entity_1 = require("./entities/weekly-score.entity");
const podium_reward_entity_1 = require("./entities/podium-reward.entity");
const user_entity_1 = require("../users/entities/user.entity");
const stellar_module_1 = require("../stellar/stellar.module");
let PodiumModule = class PodiumModule {
};
exports.PodiumModule = PodiumModule;
exports.PodiumModule = PodiumModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([weekly_score_entity_1.WeeklyScore, podium_reward_entity_1.PodiumReward, user_entity_1.User]),
            stellar_module_1.StellarModule,
        ],
        controllers: [podium_controller_1.PodiumController],
        providers: [podium_service_1.PodiumService],
        exports: [podium_service_1.PodiumService],
    })
], PodiumModule);
//# sourceMappingURL=podium.module.js.map