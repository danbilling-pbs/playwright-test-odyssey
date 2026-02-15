# Exercise 5: Agent-Driven Cloud Execution

**Time:** 30 minutes  
**Objective:** Deploy intelligent test agents to cloud platforms with auto-scaling and distributed execution capabilities

## What You Will Learn

- Deploying Playwright MCP agents to cloud infrastructure  
- Implementing distributed agent coordination and load balancing
- Creating self-scaling test fleets that adapt to workload demands
- Monitoring and orchestrating intelligent agents across multiple environments

## The Evolution: From Local to Global Agent Networks

### Traditional Cloud Testing

```javascript
// Static cloud configuration - manual scaling
const config = {
  workers: 4, // Fixed worker count
  projects: [
    { name: 'chrome', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] }
  ]
};
```

### Intelligent Agent Orchestration

```javascript
// Dynamic agent fleet - self-managing
const agentFleet = {
  minAgents: 2,
  maxAgents: 50,
  scaleMetrics: ['queue_depth', 'response_time', 'failure_rate'],
  intelligence: {
    loadPrediction: true,
    failureRecovery: true,
    costOptimization: true
  }
};
```

## Instructions

### Step 1: Configure Agent Fleet Infrastructure (10 minutes)

1. **Create cloud agent configuration:**

   ```javascript
   // config/cloud-agents.config.js
   module.exports = {
     fleetManager: {
       provider: 'azure', // or 'aws', 'gcp'
       regions: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
       scaling: {
         strategy: 'intelligent',
         minCapacity: 5,
         maxCapacity: 100,
         targetUtilization: 0.75
       },
       intelligence: {
         predictiveScaling: true,
         failureRecovery: true,
         costOptimization: true,
         learningEnabled: true
       }
     },
     
     agentTypes: {
       discovery: {
         role: 'explore_application',
         capabilities: ['dynamic_analysis', 'risk_assessment'],
         resources: { cpu: '2 cores', memory: '4GB' },
         concurrency: 3
       },
       validation: {
         role: 'verify_functionality', 
         capabilities: ['regression_testing', 'performance_monitoring'],
         resources: { cpu: '4 cores', memory: '8GB' },
         concurrency: 5
       },
       healing: {
         role: 'repair_failures',
         capabilities: ['failure_analysis', 'auto_remediation'],
         resources: { cpu: '1 core', memory: '2GB' },
         priority: 'highest'
       }
     },

     coordination: {
       messageBroker: 'azure-servicebus',
       stateStore: 'redis',
       resultStorage: 'azure-storage',
       monitoring: 'application-insights'
     }
   };
   ```

2. **Create agent deployment infrastructure:**

   ```yaml
   # infrastructure/agent-fleet.bicep
   param location string = 'eastus'
   param environment string = 'dev'

   // Container Apps for agent execution
   resource agentFleet 'Microsoft.App/containerApps@2022-03-01' = {
     name: 'playwright-agent-fleet'
     location: location
     properties: {
       environmentId: containerEnvironment.id
       configuration: {
         ingress: { external: false }
         scale: {
           minReplicas: 2
           maxReplicas: 50
           rules: [
             {
               name: 'queue-scaling'
               custom: {
                 type: 'azure-servicebus'
                 metadata: {
                   queueName: 'test-execution-queue'  
                   messageCount: '10'
                 }
               }
             }
             {
               name: 'cpu-scaling'  
               http: {
                 metadata: {
                   concurrentRequests: '5'
                 }
               }
             }
           ]
         }
       }
       template: {
         containers: [{
           name: 'playwright-agent'
           image: 'your-registry/playwright-agent:latest'
           resources: {
             cpu: 2
             memory: '4Gi'
           }
           env: [
             { name: 'AGENT_TYPE', value: 'multi-capability' }
             { name: 'MCP_ENDPOINT', secretRef: 'mcp-connection' }
             { name: 'COORDINATION_HUB', secretRef: 'servicebus-conn' }
           ]
         }]
       }
     }
   }
   ```

3. **Set up agent coordination system:**

   ```javascript
   // src/coordination/fleet-manager.js
   class FleetManager {
     constructor(config) {
       this.config = config;
       this.agentPool = new Map();
       this.workQueue = [];
       this.intelligence = new FleetIntelligence(config);
     }

     async deployAgentFleet() {
       console.log('🚀 Deploying intelligent agent fleet...');
       
       // Deploy infrastructure
       await this.provisionInfrastructure();
       
       // Start initial agent pool
       const initialAgents = await this.spawnAgents(this.config.fleetManager.minCapacity);
       
       // Start coordination services
       await this.startCoordination();
       
       console.log(`✅ Fleet deployed: ${initialAgents.length} agents ready`);
       return { fleetId: this.generateFleetId(), agents: initialAgents };
     }

     async spawnAgents(count, agentType = 'validation') {
       const agents = [];
       
       for (let i = 0; i < count; i++) {
         const agent = await this.createAgent({
           type: agentType,
           capabilities: this.config.agentTypes[agentType].capabilities,
           resources: this.config.agentTypes[agentType].resources
         });
         
         agents.push(agent);
         this.agentPool.set(agent.id, agent);
       }
       
       return agents;
     }

     async intelligentScaling() {
       const metrics = await this.collectMetrics();
       const prediction = await this.intelligence.predictDemand(metrics);
       
       if (prediction.scaleUp) {
         console.log(`📈 Scaling up: Adding ${prediction.additionalAgents} agents`);
         await this.spawnAgents(prediction.additionalAgents);
       } else if (prediction.scaleDown) {
         console.log(`📉 Scaling down: Removing ${prediction.excessAgents} agents`);
         await this.terminateAgents(prediction.excessAgents);
       }
       
       return { action: prediction.action, change: prediction.change };
     }

     async distributeWork(testSuite) {
       const workDistribution = await this.intelligence.optimizeDistribution({
         tests: testSuite,
         availableAgents: Array.from(this.agentPool.values()),
         constraints: this.config.constraints
       });

       for (const assignment of workDistribution) {
         await this.assignWork(assignment.agentId, assignment.tasks);
       }

       return workDistribution;
     }
   }
   ```

### Step 2: Implement Agent Communication & Coordination (12 minutes)

1. **Create agent communication protocol:**

   ```javascript
   // src/coordination/agent-protocol.js
   class AgentCommunicationHub {
     constructor(connectionString) {
       this.serviceBus = new ServiceBusClient(connectionString);
       this.coordinationTopic = 'agent-coordination';
       this.resultsTopic = 'test-results';
       this.agents = new Map();
     }

     async registerAgent(agentInfo) {
       console.log(`🤖 Registering agent: ${agentInfo.id} (${agentInfo.type})`);
       
       this.agents.set(agentInfo.id, {
         ...agentInfo,
         status: 'ready',
         lastHeartbeat: Date.now(),
         tasksCompleted: 0,
         capabilities: agentInfo.capabilities || []
       });

       // Start heartbeat monitoring
       this.startHeartbeatMonitoring(agentInfo.id);
       
       return { success: true, coordinationChannel: this.coordinationTopic };
     }

     async coordinateWorkDistribution(testExecution) {
       const availableAgents = Array.from(this.agents.values())
         .filter(agent => agent.status === 'ready');

       const workPlan = await this.createWorkPlan(testExecution, availableAgents);
       
       // Broadcast work assignments
       for (const assignment of workPlan.assignments) {
         await this.sendMessage('work-assignment', {
           agentId: assignment.agentId,
           tasks: assignment.tasks,
           priority: assignment.priority,
           deadline: assignment.deadline
         });
       }

       return workPlan;
     }

     async handleAgentMessage(message) {
       switch (message.type) {
         case 'task-complete':
           await this.handleTaskCompletion(message);
           break;
         case 'failure-detected':
           await this.handleFailure(message);
           break;
         case 'scaling-request':
           await this.handleScalingRequest(message);
           break;
         case 'healing-needed':
           await this.coordinateHealing(message);
           break;
       }
     }

     async coordinateHealing(healingRequest) {
       console.log(`🔧 Coordinating healing for: ${healingRequest.failedTest}`);
       
       // Find agents with healing capabilities
       const healingAgents = Array.from(this.agents.values())
         .filter(agent => agent.capabilities.includes('healing'));

       if (healingAgents.length === 0) {
         // Spawn healing agent if none available
         await this.requestAgentSpawn({ type: 'healing', urgent: true });
         return;
       }

       // Assign healing task to best available agent
       const healingAgent = this.selectOptimalAgent(healingAgents, healingRequest);
       
       await this.sendMessage('healing-assignment', {
         agentId: healingAgent.id,
         failureContext: healingRequest.context,
         healingStrategies: healingRequest.suggestedStrategies,
         priority: 'immediate'
       });
     }
   }
   ```

2. **Implement intelligent work distribution:**

   ```javascript
   // src/coordination/work-optimizer.js
   class IntelligentWorkDistributor {
     constructor(fleetIntelligence) {
       this.intelligence = fleetIntelligence;
       this.distributionHistory = [];
       this.performanceMetrics = new Map();
     }

     async optimizeDistribution(testSuite, agents) {
       // Analyze test characteristics
       const testAnalysis = await this.analyzeTests(testSuite);
       
       // Evaluate agent capabilities and performance  
       const agentCapabilities = await this.evaluateAgents(agents);
       
       // Create optimal assignment using ML
       const assignments = await this.intelligence.optimizeAssignments({
         tests: testAnalysis,
         agents: agentCapabilities,
         constraints: this.getConstraints(),
         objectives: ['minimize_time', 'maximize_reliability', 'optimize_cost']
       });

       // Learn from previous distributions
       this.learnFromHistory(assignments);

       return assignments;
     }

     async analyzeTests(testSuite) {
       const analysis = [];
       
       for (const test of testSuite) {
         const characteristics = {
           id: test.id,
           complexity: await this.assessComplexity(test),
           requiredCapabilities: await this.identifyCapabilities(test),
           estimatedDuration: await this.predictDuration(test),
           resourceRequirements: await this.estimateResources(test),
           riskLevel: await this.assessRisk(test),
           dependencies: test.dependencies || []
         };
         
         analysis.push(characteristics);
       }
       
       return analysis;
     }

     async predictDuration(test) {
       // ML-based duration prediction
       const features = this.extractFeatures(test);
       const prediction = await this.intelligence.predictExecutionTime(features);
       
       return {
         estimated: prediction.duration,
         confidence: prediction.confidence,
         factors: prediction.contributingFactors
       };
     }

     async trackPerformance(agentId, assignment, results) {
       const metrics = {
         agentId,
         assignmentId: assignment.id,
         actualDuration: results.duration,
         predictedDuration: assignment.estimatedDuration,
         successRate: results.successRate,
         resourceUtilization: results.resources,
         timestamp: Date.now()
       };

       this.performanceMetrics.set(`${agentId}_${assignment.id}`, metrics);
       
       // Feed back into ML model for improvement
       await this.intelligence.updateModel(metrics);
       
       console.log(`📊 Performance tracked for ${agentId}: ${metrics.successRate}% success`);
     }
   }
   ```

### Step 3: Deploy and Monitor Agent Fleet (8 minutes)

1. **Create deployment orchestration:**

   ```javascript
   // scripts/deploy-agent-fleet.js
   const deployAgentFleet = async () => {
     console.log('🌍 Starting global agent fleet deployment...');
     
     const deployment = {
       regions: ['eastus', 'westeurope', 'southeastasia'],
       agentTypes: {
         discovery: { count: 2, capabilities: ['exploration', 'analysis'] },
         validation: { count: 5, capabilities: ['regression', 'functional'] },
         healing: { count: 1, capabilities: ['repair', 'adaptation'] }
       }
     };

     // Deploy to each region
     const regionalDeployments = [];
     
     for (const region of deployment.regions) {
       console.log(`📍 Deploying to ${region}...`);
       
       const regionalFleet = await deployRegionalFleet({
         region,
         agents: deployment.agentTypes,
         coordination: {
           hub: `playwright-hub-${region}`,
           storage: `playwrightstorage${region}`
         }
       });
       
       regionalDeployments.push(regionalFleet);
     }

     // Set up cross-region coordination
     await setupGlobalCoordination(regionalDeployments);
     
     console.log('✅ Global agent fleet deployed successfully');
     return { deploymentId: generateId(), regions: regionalDeployments };
   };

   async function deployRegionalFleet(config) {
     // Deploy infrastructure using Bicep/ARM
     const infraResult = await deployInfrastructure(config.region);
     
     // Deploy agent containers
     const agentResult = await deployAgentContainers(config);
     
     // Configure scaling rules
     await configureAutoscaling(config.region, config.agents);
     
     return {
       region: config.region,
       infrastructure: infraResult,
       agents: agentResult,
       endpoints: {
         coordination: `https://${config.coordination.hub}.azurecontainerapps.io`,
         monitoring: `https://monitoring-${config.region}.azurefd.net`
       }
     };
   }
   ```

2. **Implement comprehensive monitoring:**

   ```javascript
   // src/monitoring/fleet-monitor.js
   class FleetMonitoringSystem {
     constructor(config) {
       this.insights = new ApplicationInsights(config.instrumentationKey);
       this.alerts = new AlertManager(config.alerting);
       this.dashboard = new FleetDashboard();
     }

     async startMonitoring(fleetId) {
       console.log(`📊 Starting fleet monitoring for: ${fleetId}`);
       
       // Real-time metrics collection
       setInterval(() => this.collectMetrics(fleetId), 30000); // 30 seconds
       
       // Health checks  
       setInterval(() => this.performHealthChecks(fleetId), 60000); // 1 minute
       
       // Performance analysis
       setInterval(() => this.analyzePerformance(fleetId), 300000); // 5 minutes
       
       // Cost optimization
       setInterval(() => this.optimizeCosts(fleetId), 900000); // 15 minutes
     }

     async collectMetrics(fleetId) {
       const metrics = {
         activeAgents: await this.countActiveAgents(),
         queueDepth: await this.getQueueDepth(),
         averageResponseTime: await this.getAverageResponseTime(),
         successRate: await this.calculateSuccessRate(),
         resourceUtilization: await this.getResourceUtilization(),
         costPerHour: await this.calculateCostMetrics()
       };

       // Send to monitoring service
       this.insights.trackMetric('fleet_metrics', metrics);
       
       // Check for anomalies
       await this.detectAnomalies(metrics);
       
       return metrics;
     }

     async detectAnomalies(currentMetrics) {
       const anomalies = [];
       
       // Check success rate drop
       if (currentMetrics.successRate < 0.95) {
         anomalies.push({
           type: 'success_rate_drop',
           severity: 'high',
           value: currentMetrics.successRate,
           threshold: 0.95
         });
       }
       
       // Check queue buildup
       if (currentMetrics.queueDepth > 100) {
         anomalies.push({
           type: 'queue_buildup',
           severity: 'medium', 
           value: currentMetrics.queueDepth,
           recommendation: 'scale_up'
         });
       }
       
       // Send alerts for anomalies
       for (const anomaly of anomalies) {
         await this.alerts.sendAlert(anomaly);
       }
       
       return anomalies;
     }

     async generateFleetReport(fleetId, timeRange) {
       const report = {
         summary: await this.getSummaryMetrics(fleetId, timeRange),
         performance: await this.getPerformanceAnalysis(fleetId, timeRange),
         costs: await this.getCostAnalysis(fleetId, timeRange),
         recommendations: await this.generateRecommendations(fleetId),
         trends: await this.analyzeTrends(fleetId, timeRange)
       };

       console.log('📋 Fleet Report Generated:');
       console.log(`- Tests Executed: ${report.summary.testsExecuted}`);
       console.log(`- Success Rate: ${report.summary.successRate}%`);
       console.log(`- Total Cost: $${report.costs.total}`);
       console.log(`- Efficiency Score: ${report.performance.efficiencyScore}`);

       return report;
     }
   }
   ```

## Running Cloud Agent Fleet

```bash
# Deploy the agent fleet  
npm run deploy:fleet -- --environment production --regions us,eu,asia

# Monitor fleet status
npm run monitor:fleet -- --dashboard --alerts  

# Scale the fleet manually
npm run scale:fleet -- --agents 20 --type validation

# Run distributed test execution
npm run test:distributed -- --suite regression --agents 15

# Generate fleet performance report  
npm run report:fleet -- --timerange 24h --format detailed
```

## Expected Outcomes

- Successfully deployed intelligent agent fleet across multiple regions
- Understanding of cloud-native test execution at scale
- Experience with agent coordination and distributed work management  
- Insights into cost optimization and performance monitoring for cloud testing
- Confidence in managing large-scale, self-managing test infrastructure

## Advanced Monitoring Dashboard

```javascript
// Real-time fleet visualization
const fleetDashboard = {
  regions: [
    { name: 'US East', agents: 15, utilization: 78%, cost: '$45/hr' },
    { name: 'EU West', agents: 12, utilization: 65%, cost: '$38/hr' }, 
    { name: 'Asia SE', agents: 8, utilization: 82%, cost: '$32/hr' }
  ],
  globalMetrics: {
    totalTests: 2847,
    successRate: 97.3,
    avgResponseTime: '1.2s',
    costEfficiency: 'Optimal'
  }
};
```

## Discussion Points

- How to balance cost optimization with performance requirements?
- What are the security considerations for distributed agent fleets?
- How can teams maintain governance and compliance across regions?
- When should agents be pre-deployed vs. on-demand scaling?

## Next Steps

In Exercise 6, you'll integrate these cloud-native agents with CI/CD pipelines, learning how to create fully automated testing workflows that scale with your development velocity.
