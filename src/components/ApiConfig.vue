     1|<template>
     2|  <div class="api-config">
     3|    <el-card class="config-card">
     4|      <template #header>
     5|        <div class="card-header">
     6|          <span>API配置</span>
     7|          <el-tag :type="isApiConfigured ? 'success' : 'danger'" size="small">
     8|            {{ isApiConfigured ? '已配置' : '未配置' }}
     9|          </el-tag>
    10|        </div>
    11|      </template>
    12|      
    13|      <!-- 配置类型选择 -->
    14|      <div class="config-type-selector">
    15|        <el-radio-group v-model="configType" @change="onConfigTypeChange">
    16|          <el-radio-button label="official">🏢 墨灵官方API</el-radio-button>
    17|          <el-radio-button label="custom">⚙️ 自定义API配置</el-radio-button>
    18|        </el-radio-group>
    19|      </div>
    20|
    21|      <!-- 主要内容区域 - 左右分栏 -->
    22|      <div class="config-main-content">
    23|        <!-- 左侧：配置说明 -->
    24|        <div class="config-tips-panel">
    25|          <!-- 官方配置说明 -->
    26|          <div v-if="configType === 'official'" class="config-tips official-tips">
    27|            <h4>🏢 官方默认配置</h4>
    28|            <div class="tips-content">
    29|              <p><strong>推荐新手使用</strong>，不会自己获取API和配置大模型的用户可以选择墨灵官方API，只需输入密钥即可。采用<strong>按次计费</strong>模式，价格透明。</p>
    30|              
    31|                             <div class="model-info">
    32|                 <h5>推荐模型：</h5>
    33|                 <ul>
    34|                   <li><strong>Claude-4 Sonnet</strong> - ￥0.1/次（默认）</li>
    35|                   <li><strong>Claude Opus 4</strong> - ￥0.5/次（顶级）</li>
    36|                   <li><strong>Claude-3.7 Thinking</strong> - ￥0.2/次（推理）</li>
    37|                   <li><strong>Claude-3.7 Sonnet</strong> - ￥0.1/次（经济）</li>
    38|                 </ul>
    39|               </div>
    40|              
    41|               <div class="usage-steps">
    42|                 <h5>使用步骤：</h5>
    43|                 <ol>
    44|                   <li>输入API密钥</li>
    45|                   <li>选择模型（推荐Claude-4 Sonnet）</li>
    46|                   <li>保存配置即可使用</li>
    47|                   <li><strong>问题交流QQ群：468734087</strong></li>
    48|                 </ol>
    49|               </div>
    50|
    51|
    52|               <div class="usage-steps">
    53|                 <h5>使用教程：</h5>
    54|                 <ol>
    55|                   <li><a href="https://www.bilibili.com/video/BV1keKgzaER2" target="_blank">API配置教程</a></li>
    56|                   <li><a href="https://www.bilibili.com/video/BV1AYKgzAEne" target="_blank">本地部署及线上部署教程</a></li>
    57|                  </ol>
    58|               </div>
    59|              
    60|              <div class="purchase-info">
    61|                <p>购买API密钥</p>
    62|                <el-button type="primary" size="small" @click="openPurchaseLink">
    63|                  前往购买
    64|                </el-button>
    65|              </div>
    66|            </div>
    67|          </div>
    68|
    69|          <!-- 自定义配置说明 -->
    70|          <div v-else class="config-tips custom-tips">
    71|            <h4>⚙️ 自定义配置</h4>
    72|            <div class="tips-content">
    73|              <p><strong>适合高级用户</strong>，仅支持openai格式API。</p>
    74|              
    75|              <div class="params-info">
    76|                <h5>参数说明：</h5>
    77|                <ul>
    78|                  <li><strong>API地址</strong> - 您的API服务地址</li>
    79|                  <li><strong>API密钥</strong> - 身份验证密钥</li>
    80|                  <li><strong>模型选择</strong> - 如果没有想要的模型，支持自定义模型</li>
    81|                  <li><strong>Token限制</strong> - 控制生成长度</li>
    82|                  <li><strong>创造性</strong> - 0保守，1创新</li>
    83|                </ul>
    84|              </div>
    85|              
    86|              <div class="supported-apis">
    87|                <h5>特殊说明：</h5>
    88|                <ul>
    89|                  <li>openai格式api是大模型通用格式，支持所有大模型</li>
    90|                  <li>支持本地部署大模型，如ollama、llmstudio等，自行学习怎么获取openai格式api</li>
    91|                </ul>
    92|              </div>
    93|
    94|              <div class="usage-steps">
    95|                 <h5>使用教程：</h5>
    96|                 <ol>
    97|                   <li><a href="https://www.bilibili.com/video/BV1keKgzaER2" target="_blank">API配置教程</a></li>
    98|                   <li><a href="https://www.bilibili.com/video/BV1AYKgzAEne" target="_blank">本地部署及线上部署教程</a></li>
    99|                  </ol>
   100|               </div>
   101|              
   102|              <div class="tips-note">
   103|                <p>💡 建议先测试连接再保存配置</p>
   104|              </div>
   105|            </div>
   106|          </div>
   107|        </div>
   108|
   109|        <!-- 右侧：配置表单 -->
   110|        <div class="config-form-panel">
   111|          <!-- 官方默认配置 -->
   112|          <div v-if="configType === 'official'" class="official-config">
   113|            <el-alert 
   114|              title="官方默认配置" 
   115|              type="info" 
   116|              :closable="false"
   117|              show-icon
   118|            >
   119|              <template #default>
   120|                使用官方推荐的API服务，稳定可靠。
   121|              </template>
   122|            </el-alert>
   123|            
   124|            <el-form :model="officialForm" label-width="80px" size="small" class="config-form">
   125|              <el-form-item label="API密钥" required>
   126|                <el-input
   127|                  v-model="officialForm.apiKey"
   128|                  type="password"
   129|                  placeholder="请输入API密钥"
   130|                  show-password
   131|                  clearable
   132|                />
   133|              </el-form-item>
   134|              
   135|              <el-form-item label="API地址">
   136|                <el-input
   137|                  v-model="officialForm.baseURL"
   138|                  placeholder="官方API地址"
   139|                  :disabled="true"
   140|                />
   141|                <div class="form-tip">官方优化地址，无需修改</div>
   142|              </el-form-item>
   143|              
   144|              <el-form-item label="推荐模型">
   145|                <el-select v-model="officialForm.selectedModel" placeholder="选择推荐模型">
   146|                  <el-option
   147|                    v-for="model in officialModels"
   148|                    :key="model.id"
   149|                    :label="model.name"
   150|                    :value="model.id"
   151|                  >
   152|                    <div class="model-option">
   153|                      <span class="model-name">{{ model.name }}</span>
   154|                      <span class="model-price">{{ model.price }}</span>
   155|                    </div>
   156|                    <div class="model-description">{{ model.description }}</div>
   157|                  </el-option>
   158|                </el-select>
   159|              </el-form-item>
   160|              
   161|              <el-form-item label="最大Token">
   162|                <div class="max-tokens-control">
   163|                  <el-checkbox v-model="officialForm.unlimitedTokens" @change="handleOfficialUnlimitedTokensChange">
   164|                    无限制Token
   165|                  </el-checkbox>
   166|                  <el-input-number
   167|                    v-if="!officialForm.unlimitedTokens"
   168|                    v-model="officialForm.maxTokens"
   169|                    :min="1"
   170|                    :max="10000000"
   171|                    :step="1000"
   172|                    style="width: 100%"
   173|                  />
   174|                </div>
   175|              </el-form-item>
   176|              
   177|              <el-form-item label="创造性">
   178|                <el-slider
   179|                  v-model="officialForm.temperature"
   180|                  :min="0"
   181|                  :max="1"
   182|                  :step="0.1"
   183|                  :format-tooltip="formatTemperature"
   184|                  show-tooltip
   185|                />
   186|              </el-form-item>
   187|              
   188|              <el-form-item>
   189|                <el-button type="primary" @click="saveOfficialConfig" :loading="validating">
   190|                  {{ validating ? '验证中...' : '保存配置' }}
   191|                </el-button>
   192|                <el-button @click="testOfficialConnection" :loading="validating">
   193|                  测试连接
   194|                </el-button>
   195|              </el-form-item>
   196|            </el-form>
   197|          </div>
   198|
   199|          <!-- 自定义配置 -->
   200|          <div v-else class="custom-config">
   201|            <el-alert 
   202|              title="自定义配置" 
   203|              type="warning" 
   204|              :closable="false"
   205|              show-icon
   206|            >
   207|              <template #default>
   208|                高级用户可自定义API地址和模型参数。
   209|              </template>
   210|            </el-alert>
   211|            
   212|            <el-form :model="customForm" label-width="80px" size="small" class="config-form">
   213|              <el-form-item label="API密钥" required>
   214|                <el-input
   215|                  v-model="customForm.apiKey"
   216|                  type="password"
   217|                  placeholder="请输入API密钥"
   218|                  show-password
   219|                  clearable
   220|                />
   221|              </el-form-item>
   222|              
   223|              <el-form-item label="API地址" required>
   224|                <el-input
   225|                  v-model="customForm.baseURL"
   226|                  placeholder="https://api.openai.com/v1"
   227|                  clearable
   228|                />
   229|              </el-form-item>
   230|              
   231|              <el-form-item label="模型选择">
   232|                <el-select 
   233|                  v-model="customForm.selectedModel" 
   234|                  placeholder="选择模型"
   235|                  filterable
   236|                  allow-create
   237|                >
   238|                  <el-option
   239|                    v-for="model in availableModels"
   240|                    :key="model.id"
   241|                    :label="model.name"
   242|                    :value="model.id"
   243|                  >
   244|                    <span>{{ model.name }}</span>
   245|                    <span style="float: right; color: #8492a6; font-size: 12px">
   246|                      {{ model.description }}
   247|                    </span>
   248|                  </el-option>
   249|                </el-select>
   250|              </el-form-item>
   251|              
   252|              <el-form-item label="自定义模型">
   253|                <div class="custom-model-input">
   254|                  <el-input
   255|                    v-model="customModelInput"
   256|                    placeholder="输入自定义模型名称"
   257|                    @keyup.enter="addCustomModel"
   258|                  />
   259|                  <el-button @click="addCustomModel" type="primary" size="small">添加</el-button>
   260|                </div>
   261|                <div v-if="customModels.length > 0" class="custom-models-list">
   262|                  <el-tag
   263|                    v-for="model in customModels"
   264|                    :key="model.id"
   265|                    closable
   266|                    @close="removeCustomModel(model.id)"
   267|                    size="small"
   268|                    style="margin-right: 8px; margin-bottom: 4px;"
   269|                  >
   270|                    {{ model.name }}
   271|                  </el-tag>
   272|                </div>
   273|              </el-form-item>
   274|              
   275|              <el-form-item label="最大Token">
   276|                <div class="max-tokens-control">
   277|                  <el-checkbox v-model="customForm.unlimitedTokens" @change="handleCustomUnlimitedTokensChange">
   278|                    无限制Token
   279|                  </el-checkbox>
   280|                  <el-input-number
   281|                    v-if="!customForm.unlimitedTokens"
   282|                    v-model="customForm.maxTokens"
   283|                    :min="1"
   284|                    :max="10000000"
   285|                    :step="1000"
   286|                    style="width: 100%"
   287|                  />
   288|                </div>
   289|              </el-form-item>
   290|              
   291|              <el-form-item label="创造性">
   292|                <el-slider
   293|                  v-model="customForm.temperature"
   294|                  :min="0"
   295|                  :max="1"
   296|                  :step="0.1"
   297|                  :format-tooltip="formatTemperature"
   298|                  show-tooltip
   299|                />
   300|              </el-form-item>
   301|              
   302|              <el-form-item>
   303|                <el-button type="primary" @click="saveCustomConfig" :loading="validating">
   304|                  {{ validating ? '验证中...' : '保存配置' }}
   305|                </el-button>
   306|                <el-button @click="testCustomConnection" :loading="validating">
   307|                  测试连接
   308|                </el-button>
   309|                <el-button @click="resetCustomConfig">重置</el-button>
   310|              </el-form-item>
   311|            </el-form>
   312|          </div>
   313|        </div>
   314|      </div>
   315|    </el-card>
   316|  </div>
   317|</template>
   318|
   319|<script setup>
   320|import { ref, reactive, computed, onMounted } from 'vue'
   321|import { ElMessage } from 'element-plus'
   322|import { useNovelStore } from '../stores/novel.js'
   323|import apiService from '../services/api.js'
   324|
   325|const store = useNovelStore()
   326|const validating = ref(false)
   327|const customModelInput = ref('')
   328|const customModels = ref([])
   329|const configType = ref('official') // 'official' 或 'custom'
   330|
   331|// 官方默认配置
   332|const officialForm = reactive({
   333|  apiKey: '',
   334|  baseURL: 'https://ai.91hub.vip/v1',
   335|  selectedModel: 'claude-4-sonnet',
   336|  maxTokens: 2000000,
   337|  unlimitedTokens: false,
   338|  temperature: 0.7
   339|})
   340|
   341|// 自定义配置
   342|const customForm = reactive({
   343|  apiKey: '',
   344|  baseURL: 'https://api.openai.com/v1',
   345|  selectedModel: 'gpt-3.5-turbo',
   346|  maxTokens: 2000000,
   347|  unlimitedTokens: false,
   348|  temperature: 0.7
   349|})
   350|
   351|// 官方推荐模型（带价格）
   352|const officialModels = [
   353|  {
   354|    id: 'claude-4-sonnet',
   355|    name: 'Claude-4 Sonnet',
   356|    description: '最新一代Claude模型，擅长创意写作和长文本处理',
   357|    price: '￥0.1/次'
   358|  },
   359|  {
   360|    id: 'claude-opus-4-20250514',
   361|    name: 'Claude Opus 4',
   362|    description: '最强性能Claude模型，顶级创作能力',
   363|    price: '￥0.5/次'
   364|  },
   365|  {
   366|    id: 'claude-3-7-sonnet-thinking',
   367|    name: 'Claude-3.7 Sonnet Thinking',
   368|    description: '具备思维链的Claude模型，逻辑推理强',
   369|    price: '￥0.2/次'
   370|  },
   371|  {
   372|    id: 'claude-3-7-sonnet-20250219',
   373|    name: 'Claude-3.7 Sonnet',
   374|    description: '高性能版本，平衡性能与成本',
   375|    price: '￥0.1/次'
   376|  }
   377|]
   378|
   379|// 自定义配置可选模型
   380|const defaultModels = [
   381|  {
   382|    id: 'deepseek-reasoner',
   383|    name: 'deepseek-r1',
   384|    description: 'deepseek-r1'
   385|  },
   386|  {
   387|    id: 'deepseek-chat',
   388|    name: 'deepseek-v3',
   389|    description: 'deepseek-v3'
   390|  },
   391|  {
   392|    id: 'claude-3.7-sonnet',
   393|    name: 'claude-3.7-sonnet',
   394|    description: 'claude-3.7-sonnet'
   395|  },
   396|  {
   397|    id: 'claude-4-sonnet',
   398|    name: 'claude-4-sonnet',
   399|    description: 'claude-4-sonnet'
   400|  },
   401|  {
   402|    id: 'gemini-2.5-pro-preview-05-06',
   403|    name: 'gemini-2.5-pro-preview-05-06',
   404|    description: 'gemini-2.5-pro-preview-05-06'
   405|  }
   406|]
   407|
   408|const availableModels = computed(() => {
   409|  return [...defaultModels, ...customModels.value]
   410|})
   411|
   412|const isApiConfigured = computed(() => store.isApiConfigured)
   413|
   414|const formatTemperature = (value) => {
   415|  if (value <= 0.3) return '保守'
   416|  if (value <= 0.7) return '平衡'
   417|  return '创新'
   418|}
   419|
   420|// 打开购买链接
   421|const openPurchaseLink = () => {
   422|  window.open('https://item.taobao.com/item.htm?ft=t&id=938261705242', '_blank')
   423|}
   424|
   425|// 配置类型切换
   426|const onConfigTypeChange = (type) => {
   427|  configType.value = type
   428|  // 根据配置类型更新store中的配置
   429|  const currentForm = type === 'official' ? officialForm : customForm
   430|  store.updateApiConfig(currentForm, type)
   431|  store.switchConfigType(type)
   432|}
   433|
   434|// 官方配置相关方法
   435|const handleOfficialUnlimitedTokensChange = () => {
   436|  if (officialForm.unlimitedTokens) {
   437|    officialForm.maxTokens = null
   438|  } else {
   439|    officialForm.maxTokens = 2000000
   440|  }
   441|}
   442|
   443|const saveOfficialConfig = async () => {
   444|  if (!officialForm.apiKey) {
   445|    ElMessage.warning('请输入API密钥')
   446|    return
   447|  }
   448|  
   449|  // 确保官方配置始终使用正确的API地址
   450|  officialForm.baseURL = 'https://ai.91hub.vip/v1'
   451|  
   452|  validating.value = true
   453|  try {
   454|    // 使用新的store API，指定配置类型为官方配置
   455|    store.updateApiConfig(officialForm, 'official')
   456|    store.switchConfigType('official')
   457|    const isValid = await store.validateApiKey()
   458|    
   459|    if (isValid) {
   460|      ElMessage.success('官方配置保存成功')
   461|      localStorage.setItem('officialApiConfig', JSON.stringify(officialForm))
   462|    } else {
   463|      ElMessage.error('API密钥验证失败，请检查配置')
   464|    }
   465|  } catch (error) {
   466|    ElMessage.error('配置保存失败：' + error.message)
   467|  } finally {
   468|    validating.value = false
   469|  }
   470|}
   471|
   472|const testOfficialConnection = async () => {
   473|  if (!officialForm.apiKey) {
   474|    ElMessage.warning('请先输入API密钥')
   475|    return
   476|  }
   477|  
   478|  // 确保官方配置始终使用正确的API地址
   479|  officialForm.baseURL = 'https://ai.91hub.vip/v1'
   480|  
   481|  validating.value = true
   482|  try {
   483|    // 使用新的store API进行测试
   484|    store.updateApiConfig(officialForm, 'official')
   485|    store.switchConfigType('official')
   486|    const isValid = await store.validateApiKey()
   487|    
   488|    if (isValid) {
   489|      ElMessage.success('官方配置连接测试成功')
   490|    } else {
   491|      ElMessage.error('连接测试失败')
   492|    }
   493|  } catch (error) {
   494|    ElMessage.error('连接测试失败：' + error.message)
   495|  } finally {
   496|    validating.value = false
   497|  }
   498|}
   499|
   500|// 自定义配置相关方法
   501|const handleCustomUnlimitedTokensChange = () => {
   502|  if (customForm.unlimitedTokens) {
   503|    customForm.maxTokens = null
   504|  } else {
   505|    customForm.maxTokens = 2000000
   506|  }
   507|}
   508|
   509|const addCustomModel = () => {
   510|  const modelName = customModelInput.value.trim()
   511|  if (!modelName) return
   512|  
   513|  const exists = availableModels.value.some(model => model.id === modelName)
   514|  if (exists) {
   515|    ElMessage.warning('该模型已存在')
   516|    return
   517|  }
   518|  
   519|  customModels.value.push({
   520|    id: modelName,
   521|    name: modelName,
   522|    description: '自定义模型'
   523|  })
   524|  
   525|  customModelInput.value = ''
   526|  ElMessage.success('自定义模型添加成功')
   527|  saveCustomModels()
   528|}
   529|
   530|const removeCustomModel = (modelId) => {
   531|  const index = customModels.value.findIndex(model => model.id === modelId)
   532|  if (index > -1) {
   533|    customModels.value.splice(index, 1)
   534|    
   535|    if (customForm.selectedModel === modelId) {
   536|      customForm.selectedModel = 'gpt-3.5-turbo'
   537|    }
   538|    
   539|    ElMessage.success('自定义模型删除成功')
   540|    saveCustomModels()
   541|  }
   542|}
   543|
   544|const saveCustomModels = () => {
   545|  localStorage.setItem('customModels', JSON.stringify(customModels.value))
   546|}
   547|
   548|const loadCustomModels = () => {
   549|  const saved = localStorage.getItem('customModels')
   550|  if (saved) {
   551|    try {
   552|      customModels.value = JSON.parse(saved)
   553|    } catch (error) {
   554|      console.error('加载自定义模型失败:', error)
   555|    }
   556|  }
   557|}
   558|
   559|const saveCustomConfig = async () => {
   560|  if (!customForm.apiKey) {
   561|    ElMessage.warning('请输入API密钥')
   562|    return
   563|  }
   564|  
   565|  validating.value = true
   566|  try {
   567|    // 使用新的store API，指定配置类型为自定义配置
   568|    store.updateApiConfig(customForm, 'custom')
   569|    store.switchConfigType('custom')
   570|    const isValid = await store.validateApiKey()
   571|    
   572|    if (isValid) {
   573|      ElMessage.success('自定义配置保存成功')
   574|      localStorage.setItem('customApiConfig', JSON.stringify(customForm))
   575|    } else {
   576|      ElMessage.error('API密钥验证失败，请检查配置')
   577|    }
   578|  } catch (error) {
   579|    ElMessage.error('配置保存失败：' + error.message)
   580|  } finally {
   581|    validating.value = false
   582|  }
   583|}
   584|
   585|const testCustomConnection = async () => {
   586|  if (!customForm.apiKey) {
   587|    ElMessage.warning('请先输入API密钥')
   588|    return
   589|  }
   590|  
   591|  validating.value = true
   592|  try {
   593|    // 使用新的store API进行测试
   594|    store.updateApiConfig(customForm, 'custom')
   595|    store.switchConfigType('custom')
   596|    const isValid = await store.validateApiKey()
   597|    
   598|    if (isValid) {
   599|      ElMessage.success('自定义配置连接测试成功')
   600|    } else {
   601|      ElMessage.error('连接测试失败')
   602|    }
   603|  } catch (error) {
   604|    ElMessage.error('连接测试失败：' + error.message)
   605|  } finally {
   606|    validating.value = false
   607|  }
   608|}
   609|
   610|const resetCustomConfig = () => {
   611|  Object.assign(customForm, {
   612|    apiKey: '',
   613|    baseURL: 'https://api.openai.com/v1',
   614|    selectedModel: 'gpt-3.5-turbo',
   615|    maxTokens: 2000000,
   616|    unlimitedTokens: false,
   617|    temperature: 0.7
   618|  })
   619|  localStorage.removeItem('customApiConfig')
   620|  ElMessage.success('自定义配置已重置')
   621|}
   622|
   623|// 加载保存的配置
   624|const loadSavedConfig = () => {
   625|  // 加载配置类型
   626|  const savedType = localStorage.getItem('apiConfigType') || 'official'
   627|  configType.value = savedType
   628|  
   629|  // 加载官方配置 - 只允许加载API密钥，其他参数保持默认值
   630|  const savedOfficial = localStorage.getItem('officialApiConfig')
   631|  if (savedOfficial) {
   632|    try {
   633|      const config = JSON.parse(savedOfficial)
   634|      // 官方配置只允许覆盖API密钥，其他参数（特别是baseURL）保持默认值
   635|      if (config.apiKey) {
   636|        officialForm.apiKey = config.apiKey
   637|      }
   638|      // 其他参数可以覆盖，但baseURL必须保持官方地址
   639|      if (config.selectedModel) {
   640|        officialForm.selectedModel = config.selectedModel
   641|      }
   642|      if (config.maxTokens !== undefined) {
   643|        officialForm.maxTokens = config.maxTokens
   644|      }
   645|      if (config.unlimitedTokens !== undefined) {
   646|        officialForm.unlimitedTokens = config.unlimitedTokens
   647|      } else if (config.maxTokens === null) {
   648|        officialForm.unlimitedTokens = true
   649|      }
   650|      if (config.temperature !== undefined) {
   651|        officialForm.temperature = config.temperature
   652|      }
   653|      // 强制保持官方API地址，不允许被覆盖
   654|      officialForm.baseURL = 'https://ai.91hub.vip/v1'
   655|    } catch (error) {
   656|      console.error('加载官方配置失败:', error)
   657|    }
   658|  }
   659|  
   660|  // 加载自定义配置 - 完全独立的数据源
   661|  const savedCustom = localStorage.getItem('customApiConfig')
   662|  if (savedCustom) {
   663|    try {
   664|      const config = JSON.parse(savedCustom)
   665|      if (config.unlimitedTokens === undefined) {
   666|        config.unlimitedTokens = config.maxTokens === null
   667|      }
   668|      Object.assign(customForm, config)
   669|    } catch (error) {
   670|      console.error('加载自定义配置失败:', error)
   671|    }
   672|  }
   673|  
   674|  // 应用当前配置类型的配置到store
   675|  const currentForm = configType.value === 'official' ? officialForm : customForm
   676|  store.updateApiConfig(currentForm, configType.value)
   677|  store.switchConfigType(configType.value)
   678|}
   679|
   680|onMounted(() => {
   681|  loadCustomModels()
   682|  loadSavedConfig()
   683|})
   684|</script>
   685|
   686|<style scoped>
   687|.api-config {
   688|  padding: 20px;
   689|  max-width: 100%;
   690|}
   691|
   692|.config-card {
   693|  max-width: 1600px;
   694|  margin: 0 auto;
   695|}
   696|
   697|.card-header {
   698|  display: flex;
   699|  justify-content: space-between;
   700|  align-items: center;
   701|}
   702|
   703|.config-type-selector {
   704|  margin-bottom: 20px;
   705|  text-align: center;
   706|}
   707|
   708|/* 主要内容区域 - 左右分栏布局 */
   709|.config-main-content {
   710|  display: grid;
   711|  grid-template-columns: 1fr 1fr;
   712|  gap: 32px;
   713|  align-items: start;
   714|}
   715|
   716|/* 左侧配置说明面板 */
   717|.config-tips-panel {
   718|  min-height: 400px;
   719|}
   720|
   721|.config-tips {
   722|  background: #f8f9fa;
   723|  border: 1px solid #e9ecef;
   724|  border-radius: 8px;
   725|  padding: 20px;
   726|  height: 100%;
   727|}
   728|
   729|.config-tips.official-tips {
   730|  background: #e8f4fd;
   731|  border-color: #b3d9f7;
   732|}
   733|
   734|.config-tips.custom-tips {
   735|  background: #fef4e8;
   736|  border-color: #f7d9b3;
   737|}
   738|
   739|.config-tips h4 {
   740|  margin: 0 0 12px 0;
   741|  color: #2c3e50;
   742|  font-size: 16px;
   743|  font-weight: 600;
   744|}
   745|
   746|.config-tips h5 {
   747|  margin: 16px 0 8px 0;
   748|  color: #34495e;
   749|  font-size: 14px;
   750|  font-weight: 600;
   751|}
   752|
   753|.tips-content p {
   754|  margin: 0 0 12px 0;
   755|  color: #5a6c7d;
   756|  line-height: 1.5;
   757|}
   758|
   759|.tips-content ul,
   760|.tips-content ol {
   761|  margin: 8px 0;
   762|  padding-left: 20px;
   763|}
   764|
   765|.tips-content li {
   766|  margin-bottom: 4px;
   767|  color: #5a6c7d;
   768|  line-height: 1.4;
   769|  font-size: 13px;
   770|}
   771|
   772|.purchase-info {
   773|  margin-top: 16px;
   774|  padding: 12px;
   775|  background: white;
   776|  border: 1px solid #ddd;
   777|  border-radius: 6px;
   778|  text-align: center;
   779|}
   780|
   781|.purchase-info p {
   782|  margin: 0 0 8px 0;
   783|  font-size: 13px;
   784|}
   785|
   786|.tips-note {
   787|  margin-top: 16px;
   788|  padding: 8px 12px;
   789|  background: #fff3cd;
   790|  border: 1px solid #ffeaa7;
   791|  border-radius: 4px;
   792|}
   793|
   794|.tips-note p {
   795|  margin: 0;
   796|  font-size: 12px;
   797|  color: #856404;
   798|}
   799|
   800|/* 右侧配置表单面板 */
   801|.config-form-panel {
   802|  min-height: 400px;
   803|}
   804|
   805|.config-form {
   806|  margin-top: 16px;
   807|  padding: 0 8px;
   808|}
   809|
   810|.model-option {
   811|  display: flex;
   812|  justify-content: space-between;
   813|  align-items: center;
   814|}
   815|
   816|.model-name {
   817|  font-weight: 500;
   818|}
   819|
   820|.model-price {
   821|  color: #F56C6C;
   822|  font-size: 12px;
   823|  font-weight: 600;
   824|}
   825|
   826|.model-description {
   827|  color: #909399;
   828|  font-size: 12px;
   829|  margin-top: 2px;
   830|}
   831|
   832|.form-tip {
   833|  font-size: 12px;
   834|  color: #909399;
   835|  margin-top: 4px;
   836|}
   837|
   838|.custom-model-input {
   839|  display: flex;
   840|  gap: 8px;
   841|  margin-bottom: 8px;
   842|}
   843|
   844|.custom-models-list {
   845|  margin-top: 8px;
   846|}
   847|
   848|.max-tokens-control {
   849|  display: flex;
   850|  flex-direction: column;
   851|  gap: 8px;
   852|}
   853|
   854|/* 响应式布局 */
   855|@media (max-width: 900px) {
   856|  .config-main-content {
   857|    grid-template-columns: 1fr;
   858|    gap: 16px;
   859|  }
   860|  
   861|  .config-tips-panel,
   862|  .config-form-panel {
   863|    min-height: auto;
   864|  }
   865|  
   866|  .config-card {
   867|    max-width: 100%;
   868|  }
   869|}
   870|
   871|@media (max-width: 1200px) and (min-width: 901px) {
   872|  .config-main-content {
   873|    grid-template-columns: 1fr 1fr;
   874|    gap: 24px;
   875|  }
   876|}
   877|
   878|:deep(.el-form-item__label) {
   879|  font-weight: 500;
   880|}
   881|
   882|:deep(.el-slider__runway) {
   883|  margin: 16px 0;
   884|}
   885|
   886|:deep(.el-radio-button__inner) {
   887|  padding: 10px 20px;
   888|  font-weight: 500;
   889|}
   890|
   891|:deep(.el-alert) {
   892|  margin-bottom: 16px;
   893|}
   894|
   895|.official-config, .custom-config {
   896|  min-height: 350px;
   897|}
   898|</style>