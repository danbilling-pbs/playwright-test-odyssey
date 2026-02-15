# Exercise 6: CI/CD Pipeline Integration with Intelligent Agents

**Time:** 30 minutes  
**Objective:** Integrate intelligent test agents into CI/CD pipelines for automatic test generation, execution, and adaptive feedback loops

## What You Will Learn

- Embedding Playwright MCP agents into GitHub Actions, Azure DevOps, and Jenkins
- Creating adaptive pipelines that evolve based on agent intelligence  
- Implementing smart test selection and risk-based testing in CI/CD
- Building feedback loops between agents and development workflows

## The Transformation: From Static to Intelligent Pipelines

### Traditional CI/CD Testing

```yaml
# Static pipeline - runs same tests every time
- name: Run Tests
  run: |
    npx playwright test
    npx playwright test --project=regression
```

### Agent-Driven CI/CD

```yaml
# Intelligent pipeline - adapts based on changes and risk
- name: Analyze Changes & Plan Tests
  uses: ./agents/test-planner@v1
  with:
    analyze_code_changes: true
    risk_assessment: true
    adaptive_selection: true
    
- name: Execute Intelligent Test Suite  
  uses: ./agents/test-executor@v1
  with:
    test_plan: ${{ steps.analyze.outputs.test_plan }}
    healing_enabled: true
    learning_mode: true
```

## Instructions

### Step 1: Create Agent-Aware Pipeline Components (12 minutes)

1. **Build intelligent test planning action:**

   ```javascript
   // .github/actions/intelligent-test-planner/action.yml
   name: 'Intelligent Test Planner'
   description: 'AI-powered test planning and risk assessment'
   
   inputs:
     code_changes:
       description: 'Git diff or changed files'
       required: true
     risk_threshold:
       description: 'Risk threshold for test selection'  
       required: false
       default: '0.7'
     learning_mode:
       description: 'Enable learning from execution results'
       required: false
       default: 'true'
         
   outputs:
     test_plan:
       description: 'Generated intelligent test execution plan'
     risk_assessment:
       description: 'Risk analysis of the changes'
     execution_strategy:
       description: 'Recommended execution strategy'
   
   runs:
     using: 'node16'
     main: 'dist/index.js'
   ```

   ```javascript
   // .github/actions/intelligent-test-planner/src/planner.js
   const { getInput, setOutput, info, warning } = require('@actions/core');
   const { context } = require('@actions/github');

   class IntelligentTestPlanner {
     constructor() {
       this.riskAnalyzer = new RiskAnalyzer();
       this.testSelector = new AdaptiveTestSelector();
       this.learningEngine = new PipelineLearningEngine();
     }

     async analyzePullRequest() {
       const pr = context.payload.pull_request;
       
       if (!pr) {
         return this.analyzeCommit();
       }

       info(`🔍 Analyzing PR #${pr.number}: ${pr.title}`);
       
       // Get changed files and diff
       const changes = await this.getChangedFiles(pr);
       
       // AI-powered risk assessment
       const riskAssessment = await this.riskAnalyzer.assessChanges({
         files: changes.files,
         diff: changes.diff,
         author: pr.user.login,
         branch: pr.head.ref,
         labels: pr.labels.map(l => l.name)
       });

       // Generate intelligent test plan
       const testPlan = await this.generateTestPlan(riskAssessment, changes);
       
       // Learn from historical data
       await this.learningEngine.incorporateHistoricalData(pr, testPlan);

       return { riskAssessment, testPlan, changes };
     }

     async generateTestPlan(riskAssessment, changes) {
       const plan = {
         strategy: this.determineStrategy(riskAssessment),
         selectedTests: [],
         parallelization: {},
         healingConfig: {},
         exitCriteria: {}
       };

       // Smart test selection based on risk and changes
       if (riskAssessment.level === 'high') {
         plan.selectedTests = await this.selectFullRegressionSuite();
         plan.strategy = 'comprehensive';
       } else if (riskAssessment.level === 'medium') {
         plan.selectedTests = await this.selectImpactBasedTests(changes);
         plan.strategy = 'targeted';
       } else {
         plan.selectedTests = await this.selectMinimalTests(changes);
         plan.strategy = 'smoke';
       }

       // Configure healing based on change types
       plan.healingConfig = {
         enabled: true,
         aggressiveness: riskAssessment.level === 'high' ? 'conservative' : 'aggressive',
         learningEnabled: true,
         adaptationThreshold: 0.8
       };

       // Set intelligent exit criteria
       plan.exitCriteria = {
         minimumSuccessRate: riskAssessment.level === 'high' ? 0.99 : 0.95,
         maxExecutionTime: riskAssessment.urgency === 'high' ? '15m' : '30m',
         healingAttempts: 3
       };

       info(`📋 Generated ${plan.strategy} test plan with ${plan.selectedTests.length} tests`);
       return plan;
     }

     async selectImpactBasedTests(changes) {
       const impactAnalysis = await this.analyzeImpact(changes);
       const selectedTests = [];

       for (const impact of impactAnalysis) {
         // AI determines which tests cover the changed functionality
         const relevantTests = await this.testSelector.findRelevantTests({
           changedFiles: impact.files,
           changedFunctions: impact.functions,
           businessLogic: impact.businessLogic,
           userJourneys: impact.affectedJourneys
         });

         selectedTests.push(...relevantTests);
       }

       // Remove duplicates and prioritize
       return this.prioritizeTests([...new Set(selectedTests)]);
     }

     determineStrategy(riskAssessment) {
       const strategies = {
         low: 'smoke',
         medium: 'targeted', 
         high: 'comprehensive',
         critical: 'full_regression'
       };

       return strategies[riskAssessment.level] || 'targeted';
     }
   }

   // Main execution
   async function run() {
     try {
       const planner = new IntelligentTestPlanner();
       const analysis = await planner.analyzePullRequest();
       
       // Set outputs for next pipeline steps
       setOutput('test_plan', JSON.stringify(analysis.testPlan));
       setOutput('risk_assessment', JSON.stringify(analysis.riskAssessment));
       setOutput('execution_strategy', analysis.testPlan.strategy);
       
       info('✅ Intelligent test planning completed');
     } catch (error) {
       core.setFailed(`Test planning failed: ${error.message}`);
     }
   }

   run();
   ```

2. **Create adaptive test execution action:**

   ```javascript
   // .github/actions/adaptive-test-executor/src/executor.js
   class AdaptiveTestExecutor {
     constructor(testPlan) {
       this.plan = testPlan;
       this.agents = new AgentOrchestrator();
       this.monitor = new ExecutionMonitor();
       this.healer = new TestHealer(testPlan.healingConfig);
     }

     async executeTestPlan() {
       info(`🚀 Starting adaptive test execution (${this.plan.strategy} strategy)`);
       
       // Initialize agent fleet based on test plan
       const fleet = await this.agents.initializeFleet({
         testCount: this.plan.selectedTests.length,
         strategy: this.plan.strategy,
         parallelization: this.plan.parallelization
       });

       // Execute tests with adaptive monitoring  
       const results = await this.executeWithAdaptation(fleet);
       
       // Generate intelligent insights
       const insights = await this.generateInsights(results);
       
       return { results, insights, fleet };
     }

     async executeWithAdaptation(fleet) {
       const results = {
         passed: [],
         failed: [],
         healed: [],
         skipped: [],
         insights: []
       };

       for (const testBatch of this.plan.testBatches) {
         info(`📦 Executing batch: ${testBatch.name} (${testBatch.tests.length} tests)`);
         
         const batchResults = await fleet.executeBatch(testBatch);
         
         // Real-time adaptation
         await this.adaptToResults(batchResults, fleet);
         
         // Healing for failures
         const healedResults = await this.healFailures(batchResults.failed);
         
         results.passed.push(...batchResults.passed);
         results.failed.push(...batchResults.stillFailed);
         results.healed.push(...healedResults.healed);
         
         // Early exit if criteria met
         if (await this.shouldExitEarly(results)) {
           info('⏰ Early exit criteria met');
           break;
         }
       }

       return results;
     }

     async adaptToResults(batchResults, fleet) {
       // Analyze failure patterns
       const failurePatterns = await this.analyzeFailures(batchResults.failed);
       
       if (failurePatterns.systemicIssue) {
         warning(`⚠️ Systemic issue detected: ${failurePatterns.issue}`);
         
         // Adjust remaining test execution
         await fleet.adjustStrategy({
           increaseHealing: true,
           reduceParallelism: true,
           extendTimeouts: true
         });
       }
       
       if (failurePatterns.environmentIssue) {
         warning(`🌍 Environment issue detected: ${failurePatterns.environment}`);
         
         // Potentially switch to different environment or pause
         await this.handleEnvironmentIssue(failurePatterns);
       }
     }

     async healFailures(failures) {
       const healingResults = { healed: [], stillFailed: [] };
       
       for (const failure of failures) {
         info(`🔧 Attempting to heal: ${failure.test}`);
         
         const healingResult = await this.healer.attemptHealing({
           test: failure.test,
           error: failure.error,
           context: failure.context,
           maxAttempts: this.plan.healingConfig.maxAttempts || 3
         });
         
         if (healingResult.success) {
           healingResults.healed.push({
             test: failure.test,
             healingStrategy: healingResult.strategy,
             attempts: healingResult.attempts
           });
         } else {
           healingResults.stillFailed.push(failure);
         }
       }
       
       return healingResults;
     }

     async generateInsights(results) {
       const insights = {
         efficiency: this.calculateEfficiency(results),
         qualityMetrics: this.calculateQualityMetrics(results),
         recommendations: await this.generateRecommendations(results),
         learningPoints: await this.extractLearningPoints(results)
       };

       info(`📊 Execution Insights:`);
       info(`- Success Rate: ${insights.qualityMetrics.successRate}%`);
       info(`- Healing Success: ${insights.qualityMetrics.healingSuccessRate}%`);
       info(`- Efficiency Score: ${insights.efficiency.score}`);

       return insights;
     }
   }
   ```

### Step 2: Build Multi-Platform Pipeline Integration (10 minutes)

1. **GitHub Actions workflow:**

   ```yaml
   # .github/workflows/intelligent-testing.yml
   name: Intelligent Test Execution

   on:
     pull_request:
       types: [opened, synchronize, reopened]
     push:
       branches: [main, develop]

   jobs:
     analyze-and-plan:
       runs-on: ubuntu-latest
       outputs:
         test-plan: ${{ steps.planner.outputs.test_plan }}
         risk-level: ${{ steps.planner.outputs.risk_assessment }}
         
       steps:
         - uses: actions/checkout@v3
           with:
             fetch-depth: 0  # Full history for better analysis
             
         - name: Intelligent Test Planning
           id: planner
           uses: ./.github/actions/intelligent-test-planner
           with:
             code_changes: ${{ github.event.pull_request.diff_url || 'commit' }}
             risk_threshold: '0.7'
             learning_mode: 'true'
             
         - name: Upload Test Plan
           uses: actions/upload-artifact@v3
           with:
             name: test-plan
             path: test-plan.json

     execute-tests:
       needs: analyze-and-plan  
       runs-on: ubuntu-latest
       strategy:
         matrix:
           agent-type: [validation, healing, discovery]
           
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Agent Environment  
           uses: ./.github/actions/setup-agent-environment
           with:
             agent-type: ${{ matrix.agent-type }}
             
         - name: Download Test Plan
           uses: actions/download-artifact@v3
           with:
             name: test-plan
             
         - name: Execute Adaptive Tests
           uses: ./.github/actions/adaptive-test-executor
           with:
             test_plan: ${{ needs.analyze-and-plan.outputs.test-plan }}
             agent_type: ${{ matrix.agent-type }}
             healing_enabled: true
             
         - name: Upload Results
           uses: actions/upload-artifact@v3
           if: always()
           with:
             name: test-results-${{ matrix.agent-type }}
             path: |
               test-results/
               playwright-report/
               healing-logs/

     analyze-results:
       needs: [analyze-and-plan, execute-tests]
       runs-on: ubuntu-latest
       if: always()
       
       steps:
         - name: Download All Results
           uses: actions/download-artifact@v3
           
         - name: Intelligent Results Analysis  
           uses: ./.github/actions/results-analyzer
           with:
             risk_level: ${{ needs.analyze-and-plan.outputs.risk-level }}
             
         - name: Update Learning Model
           uses: ./.github/actions/learning-updater
           with:
             execution_data: ${{ steps.analyze.outputs.execution_data }}
             
         - name: Generate Smart Report
           uses: ./.github/actions/smart-reporter
           id: report
           
         - name: Comment on PR
           uses: actions/github-script@v6
           if: github.event.pull_request
           with:
             script: |
               const report = ${{ steps.report.outputs.summary }};
               github.rest.issues.createComment({
                 issue_number: context.issue.number,
                 owner: context.repo.owner,
                 repo: context.repo.repo,
                 body: `## 🤖 Intelligent Test Analysis\n\n${report}`
               });
   ```

2. **Azure DevOps pipeline:**

   ```yaml
   # azure-pipelines-intelligent.yml
   trigger:
     branches:
       include: [main, develop, feature/*]
     
   variables:
     - group: playwright-agents
     - name: agentFleetEndpoint
       value: 'https://playwright-agents.azurecontainerapps.io'

   stages:
     - stage: IntelligentAnalysis
       displayName: 'Intelligent Test Analysis'
       jobs:
         - job: AnalyzeChanges
           displayName: 'AI-Powered Change Analysis'
           steps:
             - checkout: self
               fetchDepth: 0
               
             - task: NodeTool@0
               displayName: 'Setup Node.js'
               inputs:
                 versionSpec: '18.x'
                 
             - script: |
                 npm install -g @playwright/test
                 npm install
               displayName: 'Install Dependencies'
               
             - task: AzureCLI@2
               displayName: 'Deploy Agent Fleet'
               inputs:
                 azureSubscription: 'PlaywrightAgents'
                 scriptType: 'bash'
                 scriptLocation: 'inlineScript'
                 inlineScript: |
                   # Deploy agent fleet for this pipeline run
                   az containerapp create \
                     --name "agents-$(Build.BuildId)" \
                     --resource-group "playwright-agents" \
                     --environment "agent-environment" \
                     --image "playwright-agent:latest" \
                     --min-replicas 2 \
                     --max-replicas 10
                     
             - script: |
                 # Run intelligent test planning
                 node scripts/intelligent-planner.js \
                   --build-id $(Build.BuildId) \
                   --source-branch $(Build.SourceBranch) \
                   --target-branch $(System.PullRequest.TargetBranch) \
                   --agent-endpoint $(agentFleetEndpoint)
               displayName: 'Generate Intelligent Test Plan'
               
             - publish: test-plan.json
               artifact: TestPlan

     - stage: ExecuteTests  
       displayName: 'Agent-Driven Test Execution'
       dependsOn: IntelligentAnalysis
       jobs:
         - deployment: ExecuteIntelligentTests
           displayName: 'Execute with Healing Agents'
           environment: 'testing'
           strategy:
             runOnce:
               deploy:
                 steps:
                   - download: current
                     artifact: TestPlan
                     
                   - script: |
                       # Execute tests using agent fleet
                       node scripts/agent-executor.js \
                         --test-plan $(Pipeline.Workspace)/TestPlan/test-plan.json \
                         --agent-fleet $(agentFleetEndpoint) \
                         --healing-enabled true \
                         --adaptive-execution true
                     displayName: 'Execute Adaptive Test Suite'
                     
                   - task: PublishTestResults@2
                     condition: always()
                     inputs:
                       testResultsFormat: 'JUnit'
                       testResultsFiles: '**/test-results.xml'
                       mergeTestResults: true
                       
                   - task: PublishHtmlReport@1
                     condition: always()
                     inputs:
                       reportDir: 'playwright-report'
                       tabName: 'Intelligent Test Report'

     - stage: LearningFeedback
       displayName: 'Learning & Feedback'
       dependsOn: ExecuteTests
       condition: always()
       jobs:
         - job: UpdateLearningModel
           displayName: 'Update AI Models'
           steps:
             - script: |
                 # Feed results back into learning system
                 node scripts/learning-updater.js \
                   --execution-results $(Pipeline.Workspace) \
                   --build-outcome $(Agent.JobStatus)
               displayName: 'Update Learning Models'
   ```

### Step 3: Implement Feedback Loops and Learning (8 minutes)

1. **Create learning feedback system:**

   ```javascript
   // src/learning/pipeline-feedback.js
   class PipelineLearningSystem {
     constructor(config) {
       this.modelStore = new ModelStore(config.storage);
       this.analytics = new PipelineAnalytics();
       this.predictor = new ExecutionPredictor();
     }

     async processPipelineExecution(executionData) {
       console.log(`🧠 Processing pipeline execution: ${executionData.pipelineId}`);
       
       // Extract learning features
       const features = this.extractFeatures(executionData);
       
       // Update prediction models
       await this.updatePredictionModels(features, executionData.outcomes);
       
       // Learn test selection patterns
       await this.learnTestSelectionPatterns(executionData);
       
       // Update healing strategies
       await this.improveHealingStrategies(executionData.healingResults);
       
       // Generate insights for next runs
       const insights = await this.generateInsights(executionData);
       
       return insights;
     }

     async updatePredictionModels(features, outcomes) {
       // Update test duration prediction model
       const durationModel = await this.modelStore.getModel('test_duration');
       durationModel.train({
         features: features.testCharacteristics,
         labels: outcomes.actualDurations
       });

       // Update failure prediction model
       const failureModel = await this.modelStore.getModel('failure_prediction');
       failureModel.train({
         features: features.codeChanges,
         labels: outcomes.failures
       });

       // Update resource utilization model
       const resourceModel = await this.modelStore.getModel('resource_utilization');
       resourceModel.train({
         features: features.executionContext,
         labels: outcomes.resourceUsage
       });

       console.log('📈 Prediction models updated');
     }

     async learnTestSelectionPatterns(executionData) {
       const patterns = {
         effective: [], // Tests that caught real issues
         ineffective: [], // Tests that passed but missed issues
         redundant: [] // Tests that didn't add value
       };

       // Analyze test effectiveness
       for (const test of executionData.executedTests) {
         const effectiveness = await this.analyzeTestEffectiveness(test, executionData);
         
         if (effectiveness.caughtIssues) {
           patterns.effective.push({ test: test.name, score: effectiveness.score });
         } else if (effectiveness.redundant) {
           patterns.redundant.push({ test: test.name, reason: effectiveness.reason });
         }
       }

       // Update selection algorithm
       await this.modelStore.updateSelectionPatterns(patterns);
       
       console.log(`🎯 Learn selection patterns: ${patterns.effective.length} effective, ${patterns.redundant.length} redundant`);
     }

     async generateInsights(executionData) {
       const insights = {
         efficiency: await this.calculateEfficiencyScore(executionData),
         predictions: await this.generatePredictions(executionData),
         recommendations: await this.generateRecommendations(executionData),
         trends: await this.analyzeTrends(executionData)
       };

       // Store insights for dashboard
       await this.analytics.storeInsights(insights);

       return insights;
     }

     async generateRecommendations(executionData) {
       const recommendations = [];
       
       // Test selection recommendations
       if (executionData.outcomes.redundantTests > 10) {
         recommendations.push({
           type: 'test_optimization',
           message: 'Consider removing redundant tests to improve pipeline efficiency',
           impact: 'high',
           estimatedSavings: `${executionData.outcomes.redundantTests * 2} minutes`
         });
       }

       // Healing recommendations
       if (executionData.healingResults.successRate < 0.8) {
         recommendations.push({
           type: 'healing_improvement',
           message: 'Healing success rate is low. Review healing strategies',
           impact: 'medium',
           suggestedActions: ['Update selector strategies', 'Improve error analysis']
         });
       }

       // Resource optimization
       const resourceEfficiency = executionData.outcomes.resourceUtilization;
       if (resourceEfficiency < 0.6) {
         recommendations.push({
           type: 'resource_optimization',
           message: 'Low resource utilization detected. Consider adjusting agent fleet size',
           impact: 'high',
           costSavings: `$${this.calculateCostSavings(resourceEfficiency)}/month`
         });
       }

       return recommendations;
     }
   }
   ```

2. **Build adaptive pipeline dashboard:**

   ```javascript
   // src/dashboard/pipeline-dashboard.js
   class IntelligentPipelineDashboard {
     constructor() {
       this.metrics = new MetricsCollector();
       this.insights = new InsightGenerator();
     }

     async generateDashboard(pipelineId) {
       const data = await this.collectDashboardData(pipelineId);
       
       return {
         summary: {
           pipelineId,
           status: data.status,
           efficiency: data.efficiency,
           intelligenceScore: data.intelligenceScore,
           lastUpdate: new Date().toISOString()
         },
         
         testExecution: {
           totalTests: data.tests.total,
           passedTests: data.tests.passed,
           healedTests: data.tests.healed,
           failedTests: data.tests.failed,
           executionTime: data.timing.execution,
           efficiency: data.timing.efficiency
         },
         
         agentPerformance: {
           activeAgents: data.agents.active,
           utilization: data.agents.utilization,
           healingSuccessRate: data.agents.healingSuccess,
           learningProgress: data.agents.learningScore
         },
         
         insights: {
           trends: data.insights.trends,
           predictions: data.insights.predictions,
           recommendations: data.insights.recommendations,
           learningPoints: data.insights.learningPoints
         },
         
         costAnalysis: {
           currentCost: data.costs.current,
           projectedSavings: data.costs.projectedSavings,
           efficiency: data.costs.efficiency,
           optimizationOpportunities: data.costs.opportunities
         }
       };
     }

     async generatePipelineReport(timeRange) {
       const report = await this.insights.generateReport({
         timeRange,
         focus: ['efficiency', 'learning', 'cost_optimization'],
         format: 'executive_summary'
       });

       return `
   ## 🤖 Intelligent Pipeline Performance Report
   
   ### Executive Summary
   - **Intelligence Score**: ${report.summary.intelligenceScore}/100
   - **Efficiency Improvement**: ${report.summary.efficiencyGain}%
   - **Cost Savings**: $${report.summary.costSavings}/month
   - **Test Quality**: ${report.summary.testQuality}% success rate
   
   ### Key Achievements
   ${report.achievements.map(a => `- ${a.description} (${a.impact})`).join('\n')}
   
   ### Learning Progress  
   - **Models Updated**: ${report.learning.modelsUpdated}
   - **Patterns Learned**: ${report.learning.patternsLearned}
   - **Accuracy Improvement**: ${report.learning.accuracyGain}%
   
   ### Recommendations
   ${report.recommendations.map(r => `- ${r.title}: ${r.description}`).join('\n')}
   
   ### Cost Analysis
   - **Total Execution Cost**: $${report.costs.total}
   - **Cost per Test**: $${report.costs.perTest}
   - **Optimization Savings**: $${report.costs.projected_savings}
       `;
     }
   }
   ```

## Running Intelligent CI/CD

```bash
# Set up intelligent pipeline
npm run setup:intelligent-pipeline

# Deploy agent fleet for CI/CD
npm run deploy:cicd-agents -- --environment staging

# Trigger intelligent test execution
git push origin feature/new-functionality

# Monitor pipeline intelligence
npm run monitor:pipeline-intelligence

# Generate learning report
npm run report:pipeline-learning -- --days 30
```

## Expected Outcomes

- Automated, intelligent test selection based on code changes and risk
- Self-healing tests that adapt to UI changes during CI/CD execution
- Learning pipelines that improve efficiency over time
- Cost-optimized test execution with smart resource management
- Comprehensive insights and recommendations for continuous improvement

## Advanced Pipeline Features

### Predictive Test Planning

```javascript
const predictivePlanner = {
  async predictOptimalTestSuite(changes) {
    // AI predicts which tests are most likely to catch issues
    return await aiModel.predict({
      codeChanges: changes,
      historicalData: testHistory,
      riskFactors: riskAnalysis
    });
  }
};
```

### Adaptive Execution Strategy

```javascript
const adaptiveStrategy = {
  realTimeAdaptation: true,
  healingThreshold: 0.8,
  costOptimization: 'aggressive',
  learningFeedback: 'continuous'
};
```

## Discussion Points

- How can teams maintain confidence in adaptive, self-modifying pipelines?
- What governance models work best for AI-driven CI/CD?
- How to balance automation intelligence with human oversight?
- What are the security implications of learning pipelines?

## Next Steps

In Exercise 7, you'll explore advanced agent workflows including multi-environment orchestration, cross-browser intelligence, and enterprise-scale coordination patterns.
