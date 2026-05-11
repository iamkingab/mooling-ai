     1|<template>
     2|  <div class="settings-page">
     3|
     4|    <!-- 设置内容 -->
     5|    <div class="settings-content">
     6|      <el-tabs v-model="activeTab" class="settings-tabs">
     7|        <!-- API配置 -->
     8|        <el-tab-pane label="API配置" name="api">
     9|          <el-card shadow="never">
    10|            <template #header>
    11|              <div class="card-header">
    12|                <span>🔑 AI模型API配置</span>
    13|                <el-button type="primary" @click="testAllConnections">测试所有连接</el-button>
    14|              </div>
    15|            </template>
    16|            
    17|            <ApiConfig />
    18|          </el-card>
    19|        </el-tab-pane>
    20|
    21|        
    22|
    23|        <!-- 数据管理 -->
    24|        <el-tab-pane label="数据管理" name="data">
    25|          <el-card shadow="never">
    26|            <template #header>
    27|              <span>💾 数据备份与恢复</span>
    28|            </template>
    29|            
    30|            <div class="data-management">
    31|              <!-- 数据概览 -->
    32|              <div class="data-overview">
    33|                <h3>📊 数据概览</h3>
    34|                <div class="data-stats">
    35|                  <div class="stat-item">
    36|                    <div class="stat-label">小说作品</div>
    37|                    <div class="stat-value">{{ dataStats.novels }}部</div>
    38|                  </div>
    39|                  <div class="stat-item">
    40|                    <div class="stat-label">提示词库</div>
    41|                    <div class="stat-value">{{ dataStats.prompts }}条</div>
    42|                  </div>
    43|                  <div class="stat-item">
    44|                    <div class="stat-label">小说类型</div>
    45|                    <div class="stat-value">{{ dataStats.genres }}种</div>
    46|                  </div>
    47|                  <div class="stat-item">
    48|                    <div class="stat-label">写作目标</div>
    49|                    <div class="stat-value">{{ dataStats.goals }}个</div>
    50|                  </div>
    51|                  <div class="stat-item">
    52|                    <div class="stat-label">数据大小</div>
    53|                    <div class="stat-value">{{ dataStats.size }}</div>
    54|                  </div>
    55|                </div>
    56|              </div>
    57|
    58|              <el-divider />
    59|
    60|              <div class="data-section">
    61|                <h3>📤 数据导出</h3>
    62|                <p>导出您的小说数据、设置和提示词库，支持完整备份或分类导出</p>
    63|                <div class="data-actions">
    64|                  <el-button type="primary" @click="exportAllData">
    65|                    <el-icon><Download /></el-icon>
    66|                    导出所有数据
    67|                  </el-button>
    68|                  <el-button @click="exportNovels">
    69|                    <el-icon><Document /></el-icon>
    70|                    小说数据
    71|                  </el-button>
    72|                  <el-button @click="exportPrompts">
    73|                    <el-icon><ChatLineSquare /></el-icon>
    74|                    提示词库
    75|                  </el-button>
    76|                  <el-button @click="exportGenres">
    77|                    <el-icon><Collection /></el-icon>
    78|                    小说类型
    79|                  </el-button>
    80|                  <el-button @click="exportSettings">
    81|                    <el-icon><Setting /></el-icon>
    82|                    API配置
    83|                  </el-button>
    84|                </div>
    85|              </div>
    86|              
    87|              <el-divider />
    88|              
    89|              <div class="data-section">
    90|                <h3>📥 数据导入</h3>
    91|                <p>从备份文件恢复您的数据，支持完整恢复或选择性导入</p>
    92|                <div class="data-actions">
    93|                  <el-upload
    94|                    :before-upload="beforeImport"
    95|                    :show-file-list="false"
    96|                    accept=".json"
    97|                  >
    98|                    <el-button type="success">
    99|                      <el-icon><Upload /></el-icon>
   100|                      选择备份文件
   101|                    </el-button>
   102|                  </el-upload>
   103|                  <el-button @click="showImportDialog = true">
   104|                    <el-icon><Setting /></el-icon>
   105|                    导入选项
   106|                  </el-button>
   107|                </div>
   108|              </div>
   109|              
   110|              <el-divider />
   111|              
   112|              <div class="data-section">
   113|                <h3>🗑️ 数据清除</h3>
   114|                <p class="warning-text">⚠️ 危险操作：将清除本地数据，请谨慎操作</p>
   115|                <div class="data-actions">
   116|                  <el-button type="danger" @click="clearAllData">
   117|                    <el-icon><Delete /></el-icon>
   118|                    清除所有数据
   119|                  </el-button>
   120|                  <el-button type="warning" @click="clearNovels">
   121|                    <el-icon><Document /></el-icon>
   122|                    仅清除小说
   123|                  </el-button>
   124|                  <el-button type="warning" @click="clearSettings">
   125|                    <el-icon><Setting /></el-icon>
   126|                    重置API配置
   127|                  </el-button>
   128|                </div>
   129|              </div>
   130|            </div>
   131|          </el-card>
   132|        </el-tab-pane>
   133|
   134|        <!-- 关于 -->
   135|        <el-tab-pane label="关于" name="about">
   136|          <el-card shadow="never">
   137|            <template #header>
   138|              <span>ℹ️ 关于应用</span>
   139|            </template>
   140|            
   141|            <div class="about-content">
   142|              <div class="app-info">
   143|                <div class="app-logo">
   144|                  <h1>📚 墨灵</h1>
   145|                </div>
   146|                <div class="app-details">
   147|                  <p><strong>版本：</strong>v0.7.0</p>
   148|                  <p><strong>更新时间：</strong>2025年7月9日</p>
   149|                  <p><strong>开发者：</strong>墨灵团队</p>
   150|                  <p><strong>描述：</strong>基于AI技术的智能小说创作辅助工具，提供全方位的写作支持和创作灵感</p>
   151|                </div>
   152|              </div>
   153|              
   154|              <el-divider />
   155|              
   156|              <div class="features-list">
   157|                <h3>🌟 主要功能</h3>
   158|                <div class="features-grid">
   159|                  <div class="feature-category">
   160|                    <h4>📖 小说管理</h4>
   161|                    <ul>
   162|                      <li>• 多小说项目管理</li>
   163|                      <li>• 小说类型与标签</li>
   164|                      <li>• 详细作品信息</li>
   165|                      <li>• 数据统计分析</li>
   166|                    </ul>
   167|                  </div>
   168|                  
   169|                  <div class="feature-category">
   170|                    <h4>✍️ 智能编辑</h4>
   171|                    <ul>
   172|                      <li>• 章节状态管理</li>
   173|                      <li>• 事件时间线</li>
   174|                      <li>• AI内容润色</li>
   175|                      <li>• AI智能续写</li>
   176|                      <li>• 流式生成体验</li>
   177|                    </ul>
   178|                  </div>
   179|                  
   180|                  <div class="feature-category">
   181|                    <h4>🤖 AI辅助</h4>
   182|                    <ul>
   183|                      <li>• 章节大纲生成</li>
   184|                      <li>• 正文内容生成</li>
   185|                      <li>• 人物角色生成</li>
   186|                      <li>• 世界观设定生成</li>
   187|                      <li>• 多种生成类型</li>
   188|                    </ul>
   189|                  </div>
   190|                  
   191|                  <div class="feature-category">
   192|                    <h4>💡 创作工具</h4>
   193|                    <ul>
   194|                      <li>• 丰富提示词库</li>
   195|                      <li>• 人物设定管理</li>
   196|                      <li>• 世界观设定</li>
   197|                      <li>• 语料库管理</li>
   198|                      <li>• 写作目标设定</li>
   199|                    </ul>
   200|                  </div>
   201|                  
   202|                  <div class="feature-category">
   203|                    <h4>⚙️ 系统功能</h4>
   204|                    <ul>
   205|                      <li>• 多AI模型支持</li>
   206|                      <li>• API配置管理</li>
   207|                      <li>• 数据备份恢复</li>
   208|                      <li>• 短篇小说生成</li>
   209|                      <li>• 书籍分析工具</li>
   210|                    </ul>
   211|                  </div>
   212|                </div>
   213|              </div>
   214|              
   215|              <el-divider />
   216|              
   217|              <div class="update-log">
   218|                <h3>📋 更新日志</h3>
   219|                
   220|                <div class="log-item current-version">
   221|                  <h4>v0.7.0 (2025-07-9) - 当前版本</h4>
   222|                  <ul>
   223|                    <li>• 优化API配置新增官方默认API</li>
   224|                    <li>• 增加公告弹窗和教程说明</li>
   225|                    <li>• 新增切换模型参数下拉框支持随时切换模型</li>
   226|                    <li>• 短篇小说改为短文创作，新增短文写作及配置</li>
   227|                    <li>• 优化短篇小说ui和逻辑</li>
   228|                    <li>• 修复若干bug问题</li>
   229|                  </ul>
   230|                </div>
   231|                
   232|                <div class="log-item">
   233|                  <h4>v0.6.0 (2025-06-26)</h4>
   234|                  <ul>
   235|                    <li>• 短篇小说新增续写功能 - 支持自定义续写方向和字数设置</li>
   236|                    <li>• 短篇小说选文优化功能重构 - 可以优化完成之后一键插入</li>
   237|                    <li>• AI正文编辑器修复部分bug问题 - 提升编辑体验稳定性</li>
   238|                  </ul>
   239|                </div>
   240|                
   241|                <div class="log-item">
   242|                  <h4>v0.5.0 (2025-06-24)</h4>
   243|                  <ul>
   244|                    <li>• 模型配置预设模型重新梳理</li>
   245|                    <li>• 短篇小说部分API兼容问题bug修复</li>
   246|                    <li>• Ai上下文连贯性改为可以手动选择多章，默认自动关联前两章</li>
   247|                    <li>• 小说无法导出bug修复</li>
   248|                    <li>• 若干功能bug修复</li>
   249|                  </ul>
   250|                </div>
   251|                
   252|                <div class="log-item">
   253|                  <h4>v0.4.0 (2025-01-15)</h4>
   254|                  <div class="log-category">
   255|                    <h5>🆕 新增功能</h5>
   256|                    <ul>
   257|                      <li>• 全新AI续写功能，支持自定义续写方向和字数</li>
   258|                      <li>• AI内容润色功能，支持选择内容润色和整文润色</li>
   259|                      <li>• 章节状态管理系统（草稿/完成/发表）</li>
   260|                      <li>• 事件时间线编辑和删除功能</li>
   261|                      <li>• 流式输出体验，实时查看AI生成过程</li>
   262|                    </ul>
   263|                  </div>
   264|                  
   265|                  <div class="log-category">
   266|                    <h5>🔧 功能优化</h5>
   267|                    <ul>
   268|                      <li>• 进入编辑模块自动选中第一章节</li>
   269|                      <li>• 提示词库润色分类重命名为"润色优化"</li>
   270|                      <li>• 优化续写配置显示完整内容而非概要</li>
   271|                      <li>• 移除章节列表中的AI优化选项</li>
   272|                      <li>• 续写字数上限提升至5000字</li>
   273|                    </ul>
   274|                  </div>
   275|                  
   276|                  <div class="log-category">
   277|                    <h5>🛠️ 修复改进</h5>
   278|                    <ul>
   279|                      <li>• 修复续写弹窗样式布局问题</li>
   280|                      <li>• 修复编译错误和运行时错误</li>
   281|                      <li>• 优化提示词选择功能</li>
   282|                      <li>• 改善用户交互体验</li>
   283|                    </ul>
   284|                  </div>
   285|                </div>
   286|                
   287|                <div class="log-item">
   288|                  <h4>v0.3.0 (2024-12-01)</h4>
   289|                  <ul>
   290|                    <li>• 新增短篇小说生成功能</li>
   291|                    <li>• 新增书籍分析工具</li>
   292|                    <li>• 优化AI生成流程</li>
   293|                    <li>• 增强用户界面交互</li>
   294|                  </ul>
   295|                </div>
   296|                
   297|                <div class="log-item">
   298|                  <h4>v0.2.0 (2024-02-15)</h4>
   299|                  <ul>
   300|                    <li>• 重构为模块化架构</li>
   301|                    <li>• 新增系统设置页面</li>
   302|                    <li>• 优化用户界面</li>
   303|                    <li>• 增强数据管理功能</li>
   304|                  </ul>
   305|                </div>
   306|              </div>
   307|            </div>
   308|          </el-card>
   309|        </el-tab-pane>
   310|      </el-tabs>
   311|    </div>
   312|
   313|    <!-- 导入选项对话框 -->
   314|    <el-dialog v-model="showImportDialog" title="导入选项" width="500px">
   315|      <div class="import-options">
   316|        <p>选择要导入的数据类型：</p>
   317|        <el-checkbox-group v-model="importOptions">
   318|          <el-checkbox label="novels">小说数据</el-checkbox>
   319|          <el-checkbox label="prompts">提示词库</el-checkbox>
   320|          <el-checkbox label="novelGenres">小说类型</el-checkbox>
   321|          <el-checkbox label="writingGoals">写作目标</el-checkbox>
   322|          <el-checkbox label="settings">API配置</el-checkbox>
   323|        </el-checkbox-group>
   324|      </div>
   325|      <template #footer>
   326|        <el-button @click="showImportDialog = false">取消</el-button>
   327|        <el-button type="primary" @click="confirmImportOptions">确定</el-button>
   328|      </template>
   329|    </el-dialog>
   330|  </div>
   331|</template>
   332|
   333|<script setup>
   334|import { ref, watch, onMounted } from 'vue'
   335|import { ElMessage, ElMessageBox } from 'element-plus'
   336|import { Download, Upload, Document, Setting, Delete, ChatLineSquare, Collection } from '@element-plus/icons-vue'
   337|import ApiConfig from '@/components/ApiConfig.vue'
   338|
   339|// 响应式数据
   340|const activeTab = ref('api')
   341|const showImportDialog = ref(false)
   342|const importOptions = ref(['novels', 'prompts', 'novelGenres', 'writingGoals'])
   343|
   344|// 数据统计
   345|const dataStats = ref({
   346|  novels: 0,
   347|  prompts: 0,
   348|  genres: 0,
   349|  goals: 0,
   350|  size: '0KB'
   351|})
   352|
   353|// 方法
   354|const testAllConnections = () => {
   355|  ElMessage.info('正在测试所有API连接...')
   356|  // 这里调用API配置组件的测试方法
   357|}
   358|
   359|// 计算数据统计
   360|const calculateDataStats = () => {
   361|  try {
   362|    const novels = JSON.parse(localStorage.getItem('novels') || '[]')
   363|    const prompts = JSON.parse(localStorage.getItem('prompts') || '[]')
   364|    const genres = JSON.parse(localStorage.getItem('novelGenres') || '[]')
   365|    const goals = JSON.parse(localStorage.getItem('writingGoals') || '[]')
   366|    
   367|    // 计算数据大小
   368|    const allData = JSON.stringify({
   369|      novels,
   370|      prompts,
   371|      genres,
   372|      goals
   373|    })
   374|    
   375|    const sizeInBytes = new Blob([allData]).size
   376|    const sizeInKB = (sizeInBytes / 1024).toFixed(1)
   377|    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)
   378|    
   379|    dataStats.value = {
   380|      novels: novels.length,
   381|      prompts: prompts.length,
   382|      genres: genres.length,
   383|      goals: goals.length,
   384|      size: sizeInBytes > 1024 * 1024 ? `${sizeInMB}MB` : `${sizeInKB}KB`
   385|    }
   386|  } catch (error) {
   387|    console.error('计算数据统计失败:', error)
   388|  }
   389|}
   390|
   391|const exportAllData = () => {
   392|  const data = {
   393|    novels: JSON.parse(localStorage.getItem('novels') || '[]'),
   394|    prompts: JSON.parse(localStorage.getItem('prompts') || '[]'),
   395|    novelGenres: JSON.parse(localStorage.getItem('novelGenres') || '[]'),
   396|    writingGoals: JSON.parse(localStorage.getItem('writingGoals') || '[]'),
   397|    settings: {
   398|      apiConfig: JSON.parse(localStorage.getItem('api-config') || '{}'),
   399|      tokenUsage: JSON.parse(localStorage.getItem('token-usage') || '{}')
   400|    },
   401|    exportTime: new Date().toISOString(),
   402|    version: 'v0.7.0'
   403|  }
   404|  
   405|  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
   406|  const url = URL.createObjectURL(blob)
   407|  const a = document.createElement('a')
   408|  a.href = url
   409|  a.download = `墨灵-完整备份-${new Date().toISOString().split('T')[0]}.json`
   410|  a.click()
   411|  URL.revokeObjectURL(url)
   412|  
   413|  ElMessage.success('完整数据导出成功')
   414|}
   415|
   416|const exportNovels = () => {
   417|  const novels = JSON.parse(localStorage.getItem('novels') || '[]')
   418|  const data = {
   419|    novels,
   420|    exportTime: new Date().toISOString(),
   421|    type: 'novels'
   422|  }
   423|  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
   424|  const url = URL.createObjectURL(blob)
   425|  const a = document.createElement('a')
   426|  a.href = url
   427|  a.download = `墨灵-小说数据-${new Date().toISOString().split('T')[0]}.json`
   428|  a.click()
   429|  URL.revokeObjectURL(url)
   430|  
   431|  ElMessage.success('小说数据导出成功')
   432|}
   433|
   434|const exportPrompts = () => {
   435|  const prompts = JSON.parse(localStorage.getItem('prompts') || '[]')
   436|  const data = {
   437|    prompts,
   438|    exportTime: new Date().toISOString(),
   439|    type: 'prompts'
   440|  }
   441|  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
   442|  const url = URL.createObjectURL(blob)
   443|  const a = document.createElement('a')
   444|  a.href = url
   445|  a.download = `墨灵-提示词库-${new Date().toISOString().split('T')[0]}.json`
   446|  a.click()
   447|  URL.revokeObjectURL(url)
   448|  
   449|  ElMessage.success('提示词库导出成功')
   450|}
   451|
   452|const exportGenres = () => {
   453|  const genres = JSON.parse(localStorage.getItem('novelGenres') || '[]')
   454|  const data = {
   455|    novelGenres: genres,
   456|    exportTime: new Date().toISOString(),
   457|    type: 'genres'
   458|  }
   459|  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
   460|  const url = URL.createObjectURL(blob)
   461|  const a = document.createElement('a')
   462|  a.href = url
   463|  a.download = `墨灵-小说类型-${new Date().toISOString().split('T')[0]}.json`
   464|  a.click()
   465|  URL.revokeObjectURL(url)
   466|  
   467|  ElMessage.success('小说类型数据导出成功')
   468|}
   469|
   470|const exportSettings = () => {
   471|  const settings = {
   472|    apiConfig: JSON.parse(localStorage.getItem('api-config') || '{}'),
   473|    tokenUsage: JSON.parse(localStorage.getItem('token-usage') || '{}'),
   474|    exportTime: new Date().toISOString(),
   475|    type: 'settings'
   476|  }
   477|  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
   478|  const url = URL.createObjectURL(blob)
   479|  const a = document.createElement('a')
   480|  a.href = url
   481|  a.download = `墨灵-系统设置-${new Date().toISOString().split('T')[0]}.json`
   482|  a.click()
   483|  URL.revokeObjectURL(url)
   484|  
   485|  ElMessage.success('系统设置导出成功')
   486|}
   487|
   488|const confirmImportOptions = () => {
   489|  if (importOptions.value.length === 0) {
   490|    ElMessage.warning('请至少选择一种数据类型进行导入')
   491|    return
   492|  }
   493|  
   494|  const input = document.createElement('input')
   495|  input.type = 'file'
   496|  input.accept = '.json'
   497|  input.onchange = (e) => {
   498|    const file = e.target.files[0]
   499|    if (file) {
   500|      beforeImport(file)
   501|    }
   502|  }
   503|  input.click()
   504|  showImportDialog.value = false
   505|}
   506|
   507|const beforeImport = (file) => {
   508|  const reader = new FileReader()
   509|  reader.onload = (e) => {
   510|    try {
   511|      const data = JSON.parse(e.target.result)
   512|      
   513|      ElMessageBox.confirm(
   514|        `即将导入以下数据类型：${importOptions.value.join('、')}。这将覆盖现有数据，是否继续？`,
   515|        '确认导入',
   516|        {
   517|          confirmButtonText: '确定',
   518|          cancelButtonText: '取消',
   519|          type: 'warning'
   520|        }
   521|      ).then(() => {
   522|        let importCount = 0
   523|        
   524|        // 根据选择导入数据
   525|        if (importOptions.value.includes('novels') && data.novels) {
   526|          localStorage.setItem('novels', JSON.stringify(data.novels))
   527|          importCount++
   528|        }
   529|        
   530|        if (importOptions.value.includes('prompts') && data.prompts) {
   531|          localStorage.setItem('prompts', JSON.stringify(data.prompts))
   532|          importCount++
   533|        }
   534|        
   535|        if (importOptions.value.includes('novelGenres') && data.novelGenres) {
   536|          localStorage.setItem('novelGenres', JSON.stringify(data.novelGenres))
   537|          importCount++
   538|        }
   539|        
   540|        if (importOptions.value.includes('writingGoals')) {
   541|          if (data.writingGoals) {
   542|            localStorage.setItem('writingGoals', JSON.stringify(data.writingGoals))
   543|            importCount++
   544|          } else if (data.goals) {
   545|            localStorage.setItem('writingGoals', JSON.stringify(data.goals))
   546|            importCount++
   547|          }
   548|        }
   549|        
   550|        if (importOptions.value.includes('settings') && data.settings) {
   551|          if (data.settings.apiConfig) {
   552|            localStorage.setItem('api-config', JSON.stringify(data.settings.apiConfig))
   553|            importCount++
   554|          }
   555|          if (data.settings.tokenUsage) {
   556|            localStorage.setItem('token-usage', JSON.stringify(data.settings.tokenUsage))
   557|            importCount++
   558|          }
   559|        }
   560|        
   561|        // 重新计算数据统计
   562|        calculateDataStats()
   563|        
   564|        if (importCount > 0) {
   565|          ElMessage.success(`成功导入 ${importCount} 项数据`)
   566|        } else {
   567|          ElMessage.warning('未找到匹配的数据进行导入')
   568|        }
   569|      })
   570|    } catch (error) {
   571|      ElMessage.error('文件格式错误，请选择有效的备份文件')
   572|    }
   573|  }
   574|  reader.readAsText(file)
   575|  return false // 阻止自动上传
   576|}
   577|
   578|const clearAllData = () => {
   579|  ElMessageBox.confirm(
   580|    '这将清除所有本地数据，包括小说、设置、提示词等。此操作不可恢复，确定继续吗？',
   581|    '确认清除',
   582|    {
   583|      confirmButtonText: '确定清除',
   584|      cancelButtonText: '取消',
   585|      type: 'warning'
   586|    }
   587|  ).then(() => {
   588|    localStorage.clear()
   589|    ElMessage.success('所有数据已清除')
   590|    setTimeout(() => {
   591|      location.reload()
   592|    }, 1000)
   593|  })
   594|}
   595|
   596|const clearNovels = () => {
   597|  ElMessageBox.confirm(
   598|    '这将清除所有小说数据，此操作不可恢复，确定继续吗？',
   599|    '确认清除小说',
   600|    {
   601|      confirmButtonText: '确定清除',
   602|      cancelButtonText: '取消',
   603|      type: 'warning'
   604|    }
   605|  ).then(() => {
   606|    localStorage.removeItem('novels')
   607|    calculateDataStats()
   608|    ElMessage.success('小说数据已清除')
   609|  })
   610|}
   611|
   612|const clearSettings = () => {
   613|  ElMessageBox.confirm(
   614|    '这将清除API配置等系统设置，确定继续吗？',
   615|    '确认重置设置',
   616|    {
   617|      confirmButtonText: '确定重置',
   618|      cancelButtonText: '取消',
   619|      type: 'warning'
   620|    }
   621|  ).then(() => {
   622|    // 清除API配置等设置
   623|    const settingsKeys = ['api-config', 'token-usage']
   624|    settingsKeys.forEach(key => localStorage.removeItem(key))
   625|    
   626|    ElMessage.success('系统设置已重置')
   627|    setTimeout(() => {
   628|      location.reload()
   629|    }, 1000)
   630|  })
   631|}
   632|
   633|// 生命周期
   634|onMounted(() => {
   635|  calculateDataStats()
   636|})
   637|</script>
   638|
   639|<style scoped>
   640|.settings-page {
   641|  padding: 0;
   642|}
   643|
   644|
   645|.settings-content {
   646|  background: white;
   647|  border-radius: 8px;
   648|}
   649|
   650|.settings-tabs {
   651|  min-height: 600px;
   652|}
   653|
   654|.card-header {
   655|  display: flex;
   656|  justify-content: space-between;
   657|  align-items: center;
   658|  font-weight: 600;
   659|}
   660|
   661|.data-management {
   662|  padding: 10px 0;
   663|}
   664|
   665|.data-overview {
   666|  margin-bottom: 20px;
   667|}
   668|
   669|.data-overview h3 {
   670|  margin: 0 0 15px 0;
   671|  font-size: 16px;
   672|  font-weight: 600;
   673|  color: #303133;
   674|}
   675|
   676|.data-stats {
   677|  display: grid;
   678|  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
   679|  gap: 15px;
   680|  margin-bottom: 10px;
   681|}
   682|
   683|.stat-item {
   684|  text-align: center;
   685|  padding: 15px;
   686|  background: #f8f9fa;
   687|  border-radius: 8px;
   688|  border: 1px solid #e9ecef;
   689|}
   690|
   691|.stat-label {
   692|  font-size: 12px;
   693|  color: #6c757d;
   694|  margin-bottom: 5px;
   695|}
   696|
   697|.stat-value {
   698|  font-size: 18px;
   699|  font-weight: 600;
   700|  color: #495057;
   701|}
   702|
   703|.data-section {
   704|  margin-bottom: 20px;
   705|}
   706|
   707|.data-section h3 {
   708|  margin: 0 0 10px 0;
   709|  font-size: 16px;
   710|  font-weight: 600;
   711|  color: #303133;
   712|}
   713|
   714|.data-section p {
   715|  margin: 0 0 15px 0;
   716|  color: #606266;
   717|  font-size: 14px;
   718|}
   719|
   720|.warning-text {
   721|  color: #f56c6c !important;
   722|}
   723|
   724|.data-actions {
   725|  display: flex;
   726|  gap: 10px;
   727|  flex-wrap: wrap;
   728|}
   729|
   730|.about-content {
   731|  padding: 10px 0;
   732|}
   733|
   734|.app-info {
   735|  text-align: center;
   736|  margin-bottom: 20px;
   737|}
   738|
   739|.app-logo h1 {
   740|  margin: 0 0 20px 0;
   741|  font-size: 32px;
   742|  color: #409eff;
   743|}
   744|
   745|.app-details p {
   746|  margin: 8px 0;
   747|  color: #606266;
   748|}
   749|
   750|.features-list h3,
   751|.update-log h3 {
   752|  margin: 0 0 15px 0;
   753|  font-size: 16px;
   754|  font-weight: 600;
   755|  color: #303133;
   756|}
   757|
   758|.features-grid {
   759|  display: grid;
   760|  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
   761|  gap: 20px;
   762|  margin-top: 15px;
   763|}
   764|
   765|.feature-category {
   766|  background: #f8f9fa;
   767|  border: 1px solid #e9ecef;
   768|  border-radius: 8px;
   769|  padding: 15px;
   770|}
   771|
   772|.feature-category h4 {
   773|  margin: 0 0 12px 0;
   774|  font-size: 14px;
   775|  font-weight: 600;
   776|  color: #409eff;
   777|  border-bottom: 2px solid #409eff;
   778|  padding-bottom: 8px;
   779|}
   780|
   781|.feature-category ul {
   782|  margin: 0;
   783|  padding: 0;
   784|  list-style: none;
   785|}
   786|
   787|.feature-category li {
   788|  margin: 6px 0;
   789|  color: #606266;
   790|  font-size: 13px;
   791|  line-height: 1.4;
   792|}
   793|
   794|.features-list ul {
   795|  margin: 0;
   796|  padding-left: 20px;
   797|}
   798|
   799|.features-list li {
   800|  margin: 8px 0;
   801|  color: #606266;
   802|}
   803|
   804|.log-item {
   805|  margin-bottom: 20px;
   806|  background: #f8f9fa;
   807|  border: 1px solid #e9ecef;
   808|  border-radius: 8px;
   809|  padding: 15px;
   810|}
   811|
   812|.log-item.current-version {
   813|  background: linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%);
   814|  border: 2px solid #409eff;
   815|}
   816|
   817|.log-item h4 {
   818|  margin: 0 0 15px 0;
   819|  font-size: 15px;
   820|  font-weight: 600;
   821|  color: #409eff;
   822|  padding-bottom: 8px;
   823|  border-bottom: 1px solid #409eff;
   824|}
   825|
   826|.log-category {
   827|  margin-bottom: 15px;
   828|}
   829|
   830|.log-category h5 {
   831|  margin: 0 0 8px 0;
   832|  font-size: 13px;
   833|  font-weight: 600;
   834|  color: #67c23a;
   835|}
   836|
   837|.import-options {
   838|  padding: 10px 0;
   839|}
   840|
   841|.import-options p {
   842|  margin: 0 0 15px 0;
   843|  color: #606266;
   844|}
   845|
   846|.import-options .el-checkbox-group {
   847|  display: flex;
   848|  flex-direction: column;
   849|  gap: 10px;
   850|}
   851|
   852|.log-item ul {
   853|  margin: 0;
   854|  padding-left: 20px;
   855|}
   856|
   857|.log-item li {
   858|  margin: 5px 0;
   859|  color: #606266;
   860|  font-size: 14px;
   861|}
   862|
   863|/* 响应式设计 */
   864|@media (max-width: 768px) {
   865|  .data-actions {
   866|    flex-direction: column;
   867|  }
   868|  
   869|  .data-actions .el-button {
   870|    width: 100%;
   871|  }
   872|}
   873|
   874|/* 主题样式 */
   875|:root[data-theme="light"] {
   876|  --bg-color: #ffffff;
   877|  --text-color: #303133;
   878|  --border-color: #e4e7ed;
   879|}
   880|
   881|:root[data-theme="dark"] {
   882|  --bg-color: #1d1d1d;
   883|  --text-color: #ffffff;
   884|  --border-color: #434343;
   885|}
   886|
   887|:root[data-theme="dark"] .settings-page {
   888|  background-color: var(--bg-color);
   889|  color: var(--text-color);
   890|}
   891|
   892|:root[data-theme="dark"] .el-card {
   893|  background-color: #2d2d2d;
   894|  border-color: var(--border-color);
   895|}
   896|
   897|/* 禁用动画 */
   898|.no-animations * {
   899|  animation-duration: 0ms !important;
   900|  animation-delay: 0ms !important;
   901|  transition-duration: 0ms !important;
   902|  transition-delay: 0ms !important;
   903|}
   904|</style>