async function generateRule(proto, sourceIps, sourcePorts, destIps, destPorts, fwMark, lanZoneIfaces) {
    let outputRule = `chain mangle_output {\n`;
    let preroutingRule = `chain mangle_prerouting {\n`;
  
    const sourceIpArray = sourceIps.split(',').map(ip => ip.trim());
    const destIpArray = destIps.split(',').map(ip => ip.trim());
  
    // Generate mangle_output rule
    if (proto !== 'icmp' && proto !== 'all') {
      outputRule += `  ip saddr { ${sourceIpArray.filter(ip => ip.includes(':')).join(', ')} }`;
      outputRule += ` ip6 saddr { ${sourceIpArray.filter(ip => !ip.includes(':')).join(', ')} }`;
    }
    outputRule += ` ip daddr { ${destIpArray.filter(ip => ip.includes(':')).join(', ')} }`;
    outputRule += ` ip6 daddr { ${destIpArray.filter(ip => !ip.includes(':')).join(', ')} }`;
    outputRule += ` counter meta mark set ${fwMark} comment "!fw4: ${fwMark}"\n}\n`;
  
    // Generate mangle_prerouting rule
    if (lanZoneIfaces.length > 0) {
      const ifaceRules = lanZoneIfaces.map(iface => {
        let rule = `  iifname ${iface} ip saddr { ${sourceIpArray.filter(ip => ip.includes(':')).join(', ')} }`;
        rule += ` ip6 saddr { ${sourceIpArray.filter(ip => !ip.includes(':')).join(', ')} }`;
        rule += ` ip daddr { ${destIpArray.filter(ip => ip.includes(':')).join(', ')} }`;
        rule += ` ip6 daddr { ${destIpArray.filter(ip => !ip.includes(':')).join(', ')} }`;
        rule += ` counter meta mark set ${fwMark} comment "!fw4: ${fwMark}"`;
        return rule;
      });
  
      preroutingRule += ifaceRules.join('\n') + '\n';
    }
  
    return outputRule + '\n' + preroutingRule;
  }
  

  generateRule('all', '0.0.0.0/0,::/0', 'none', '104.31.16.9,104.31.16.120,104.21.39.145,172.67.170.206,104.17.49.74,104.17.50.74,104.31.16.11,104.31.16.118,2606:4700:3033::6815:2791, 2606:4700:3033::ac43:aace', 'none', '0x000affa1', ['br-lan'])
  .then(ruleString => console.log(ruleString))
  .catch(err => console.error(err));
