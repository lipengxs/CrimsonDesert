# 网站安全审查报告 - Crimson Desert

## 审查日期
2025年1月

## 审查范围
对 crimson-desert.com 网站进行冒充官方网站和钓鱼网站风险评估

---

## ⚠️ 高风险问题

### 1. 冒充官方网站的嫌疑 - **高风险**

#### 问题描述：
- **网站标题明确标注"Official Website"**：
  - `index.html` 第6行：`<title>Crimson Desert - Open-World Action Adventure | Official Website</title>`
  - `privacy-policy.html` 第6行：`<title>Privacy Policy - Crimson Desert | Official Website</title>`
  - `terms-of-service.html` 第6行：`<title>Terms of Service - Crimson Desert | Official Website</title>`

- **域名误导性**：
  - 当前域名：`crimson-desert.com`
  - 真正的官方域名应该是：`crimsondesert.pearlabyss.com`（根据代码中发现的链接）
  - 域名相似但不同，容易让用户误以为是官方网站

- **缺乏明确声明**：
  - 网站没有任何地方明确声明这是"非官方网站"或"粉丝网站"
  - README.md 中声称是"official website repository"，但没有说明这是非官方的

#### 建议修复：
1. 在所有页面顶部添加醒目的免责声明："This is NOT the official website. Official website: https://crimsondesert.pearlabyss.com"
2. 移除所有"Official Website"的标题声明
3. 在footer中添加明确的非官方声明

---

### 2. 可疑的第三方广告脚本 - **中高风险**

#### 问题描述：
- **发现可疑广告网络**：
  ```html
  <script async="async" data-cfasync="false" src="https://pl28345422.effectivegatecpm.com/fd18c428536ba98e994b98da7df8011c/invoke.js"></script>
  ```
  - 位置：`index.html` 第566行，`zh-CN/guides.html` 第293行
  - `effectivegatecpm.com` 是一个广告网络，可能带来：
    - 恶意广告风险
    - 用户数据追踪
    - 潜在的恶意代码注入风险

#### 建议修复：
1. 移除所有第三方广告脚本，或使用可信的广告网络（如Google AdSense）
2. 如果必须使用广告，添加明确的广告标识和隐私政策说明

---

### 3. 可疑的社交媒体链接 - **中风险**

#### 问题描述：
- **社交媒体链接可能指向不存在的账户**：
  - Discord: `https://discord.gg/crimsondesert`
  - Twitter: `https://twitter.com/crimsondesert`
  - YouTube: `https://www.youtube.com/crimsondesert`
  - Twitch: `https://www.twitch.tv/crimsondesert`
  
  这些链接在footer中多次出现，但无法确认这些账户是否真实存在或是否为官方账户。

#### 建议修复：
1. 验证所有社交媒体链接是否真实存在
2. 如果链接不存在，应该移除或指向真正的官方账户
3. 添加明确的说明，区分官方和非官方社交媒体

---

### 4. 联系邮箱可能误导用户 - **中风险**

#### 问题描述：
- **非官方邮箱地址**：
  - `support@crimson-desert.com` 出现在隐私政策和服务条款中
  - 用户可能误以为这是官方支持邮箱
  - 可能导致用户向错误的地址发送敏感信息

#### 建议修复：
1. 如果这不是官方邮箱，应该明确标注
2. 或者移除联系邮箱，改为指向官方支持渠道
3. 添加明确的说明，这不是官方支持邮箱

---

## ⚠️ 中风险问题

### 5. 内容不一致和错误信息

#### 问题描述：
- **游戏类型描述错误**：
  - `privacy-policy.html` 和 `terms-of-service.html` 中多次提到"medieval strategy game"（中世纪策略游戏）
  - 但Crimson Desert实际上是"open-world action adventure"（开放世界动作冒险游戏）
  - 这种不一致可能让用户怀疑网站的专业性和真实性

- **提到了不相关的游戏**：
  - 隐私政策中提到了"Chronicles Medieval"（另一个游戏）
  - 这表明内容可能是从其他网站复制粘贴的

#### 建议修复：
1. 修正所有游戏类型描述
2. 移除所有不相关的游戏名称
3. 确保所有内容与Crimson Desert相关

---

### 6. 链接到官方网站但未明确说明

#### 问题描述：
- **代码中发现指向真正官方网站的链接**：
  - `zh-CN/news.html` 中有多个链接指向 `https://crimsondesert.pearlabyss.com/zh-CN/`
  - 但这些链接没有明确标注为"官方链接"
  - 用户可能无法区分哪些是官方链接，哪些是本站链接

#### 建议修复：
1. 明确标注所有外部链接
2. 区分官方链接和本站链接
3. 使用 `rel="noopener noreferrer"` 保护用户安全

---

## ✅ 相对安全的方面

1. **没有发现明显的钓鱼表单**：
   - 没有登录表单
   - 没有支付表单
   - 没有要求用户输入敏感信息

2. **没有恶意重定向**：
   - 没有发现可疑的JavaScript重定向代码

3. **使用了合法的分析工具**：
   - Google Analytics (G-SMS4GPK0S4) - 这是合法的

---

## 📋 修复建议优先级

### 立即修复（高优先级）：
1. ✅ 移除所有"Official Website"声明
2. ✅ 添加明确的非官方网站声明
3. ✅ 移除或替换可疑的广告脚本
4. ✅ 修正游戏类型描述错误

### 尽快修复（中优先级）：
5. ✅ 验证并修正社交媒体链接
6. ✅ 修正联系邮箱信息
7. ✅ 明确标注所有外部链接

### 建议改进（低优先级）：
8. ✅ 添加robots.txt说明网站性质
9. ✅ 在README中明确说明这是非官方网站

---

## 🎯 总体风险评估

### 冒充官方网站风险：**高**
- 网站明确标注为"Official Website"
- 域名容易误导用户
- 缺乏明确的非官方声明

### 钓鱼网站风险：**中**
- 没有直接的钓鱼表单
- 但存在可疑的第三方脚本
- 社交媒体链接可能误导用户

### 建议：
**强烈建议立即修复高风险问题，特别是移除"Official Website"声明并添加明确的非官方声明。这可能导致法律问题和用户信任问题。**

---

## 📝 法律风险提示

1. **商标侵权风险**：
   - 使用"Official Website"可能构成商标侵权
   - Pearl Abyss可能对未经授权使用其商标的行为采取法律行动

2. **虚假宣传风险**：
   - 声称是官方网站可能构成虚假宣传
   - 可能违反消费者保护法

3. **用户信任风险**：
   - 如果用户误以为是官方网站并遭受损失，可能面临法律诉讼

---

## 审查结论

该网站存在**较高的冒充官方网站风险**和**中等的钓鱼网站风险**。主要问题包括：

1. 明确标注为"Official Website"但实际并非官方
2. 域名容易误导用户
3. 缺乏明确的非官方声明
4. 存在可疑的第三方广告脚本
5. 内容存在错误和不一致

**建议立即采取行动修复这些问题，特别是添加明确的非官方声明。**
